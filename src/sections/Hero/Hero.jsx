import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import portraitUrl from '../../../portrait.png'

const PARTICLE_COUNT_DESKTOP = 26000
const PARTICLE_COUNT_MOBILE = 11000

function sampleCanvas(canvas, limit) {
  const context = canvas.getContext('2d', { willReadFrequently: true })
  const { width, height } = canvas
  const pixels = context.getImageData(0, 0, width, height).data
  const samples = []
  const stride = Math.max(2, Math.ceil(Math.sqrt((width * height) / (limit * 2))))

  for (let y = 0; y < height; y += stride) {
    for (let x = 0; x < width; x += stride) {
      const index = (y * width + x) * 4
      const r = pixels[index]
      const g = pixels[index + 1]
      const b = pixels[index + 2]
      const a = pixels[index + 3]
      const luminance = r * 0.2126 + g * 0.7152 + b * 0.0722

      // The supplied portrait is JPEG data inside a .png file, so its black
      // background has to be treated as the subject mask instead of alpha.
      if (a > 12 && luminance > 24) samples.push({ x, y, r, g, b })
    }
  }

  return samples
}

function createNameTargets(count) {
  const canvas = document.createElement('canvas')
  canvas.width = 1800
  canvas.height = 520
  const context = canvas.getContext('2d')
  context.fillStyle = '#000'
  context.fillRect(0, 0, canvas.width, canvas.height)
  context.fillStyle = '#fff'
  context.font = '600 145px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillText('HARRY JEES', canvas.width / 2, canvas.height / 2 + 12)

  const samples = sampleCanvas(canvas, count)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    const source = samples[i % samples.length]
    const index = i * 3
    positions[index] = (source.x / canvas.width - 0.5) * 4.6
    positions[index + 1] = (0.5 - source.y / canvas.height) * 1.7
    positions[index + 2] = (Math.random() - 0.5) * 0.12
    colors[index] = 0.95
    colors[index + 1] = 0.97
    colors[index + 2] = 0.94
  }

  return { positions, colors }
}

function createPortraitTargets(image, count) {
  const canvas = document.createElement('canvas')
  const scale = Math.min(1, 720 / image.width)
  canvas.width = Math.floor(image.width * scale)
  canvas.height = Math.floor(image.height * scale)
  const context = canvas.getContext('2d', { willReadFrequently: true })
  context.drawImage(image, 0, 0, canvas.width, canvas.height)
  const samples = sampleCanvas(canvas, count)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  const heightScale = 6.2 / canvas.height

  for (let i = 0; i < count; i += 1) {
    const source = samples[i % samples.length]
    const index = i * 3
    positions[index] = (source.x - canvas.width / 2) * heightScale
    positions[index + 1] = (canvas.height / 2 - source.y) * heightScale
    positions[index + 2] = (Math.random() - 0.5) * 0.24
    colors[index] = source.r / 255
    colors[index + 1] = source.g / 255
    colors[index + 2] = source.b / 255
  }

  return { positions, colors }
}

function createScatter(count, radius = 8) {
  const positions = new Float32Array(count * 3)
  const directions = new Float32Array(count * 3)

  for (let i = 0; i < count; i += 1) {
    const index = i * 3
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const x = Math.sin(phi) * Math.cos(theta)
    const y = Math.sin(phi) * Math.sin(theta)
    const z = Math.cos(phi)
    positions[index] = x * radius * (0.6 + Math.random() * 0.7)
    positions[index + 1] = y * radius * (0.6 + Math.random() * 0.7)
    positions[index + 2] = z * radius * (0.6 + Math.random() * 0.7)
    directions[index] = x * (2 + Math.random() * 4)
    directions[index + 1] = y * (2 + Math.random() * 4)
    directions[index + 2] = z * (2 + Math.random() * 4)
  }

  return { positions, directions }
}

function lerp(a, b, amount) {
  return a + (b - a) * amount
}

export function Hero() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const leftCopyRef = useRef(null)
  const rightCopyRef = useRef(null)
  const technicalRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    const count = window.matchMedia('(max-width: 768px)').matches
      ? PARTICLE_COUNT_MOBILE
      : PARTICLE_COUNT_DESKTOP
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0, 8.4)
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.outputColorSpace = THREE.SRGBColorSpace

    const name = createNameTargets(count)
    const scatter = createScatter(count)
    const positions = new Float32Array(scatter.positions)
    const colors = new Float32Array(name.colors)
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const material = new THREE.PointsMaterial({
      size: window.matchMedia('(max-width: 768px)').matches ? 0.035 : 0.022,
      vertexColors: true,
      transparent: true,
      opacity: 0.94,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    const points = new THREE.Points(geometry, material)
    scene.add(points)

    const state = { progress: 0 }
    let portrait = null
    let animationFrame = 0
    let running = true
    let settledTimer = 0

    const resize = () => {
      const width = stage.clientWidth
      const height = stage.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const render = () => {
      if (!running) return
      const progress = state.progress
      const formation = Math.min(1, Math.max(0, (progress - 0.11) / 0.25))
      const morph = formation * formation * (3 - 2 * formation)
      const hold = Math.min(1, Math.max(0, (progress - 0.36) / 0.18))
      const rotation = Math.min(1, Math.max(0, (progress - 0.51) / 0.19))
      const explosion = Math.min(1, Math.max(0, (progress - 0.7) / 0.3))
      const easeExplosion = explosion * explosion * (3 - 2 * explosion)
      const portraitTargets = portrait?.positions ?? name.positions
      const portraitColors = portrait?.colors ?? name.colors
      const ambient = reducedMotion ? 0 : Math.sin(performance.now() * 0.00045) * 0.018

      for (let i = 0; i < count; i += 1) {
        const index = i * 3
        const nameX = name.positions[index]
        const nameY = name.positions[index + 1]
        const nameZ = name.positions[index + 2]
        const targetX = lerp(nameX, portraitTargets[index], morph)
        const targetY = lerp(nameY, portraitTargets[index + 1], morph)
        const targetZ = lerp(nameZ, portraitTargets[index + 2], morph)
        positions[index] = targetX + scatter.directions[index] * easeExplosion + ambient
        positions[index + 1] = targetY + scatter.directions[index + 1] * easeExplosion
        positions[index + 2] = targetZ + scatter.directions[index + 2] * easeExplosion
        colors[index] = lerp(name.colors[index], portraitColors[index], morph)
        colors[index + 1] = lerp(name.colors[index + 1], portraitColors[index + 1], morph)
        colors[index + 2] = lerp(name.colors[index + 2], portraitColors[index + 2], morph)
      }

      geometry.attributes.position.needsUpdate = true
      geometry.attributes.color.needsUpdate = true
      const activeRotation = reducedMotion ? 0 : rotation * 0.42
      points.rotation.y = activeRotation + Math.sin(performance.now() * 0.0003) * 0.012 * hold
      points.rotation.x = reducedMotion ? 0 : Math.sin(rotation * Math.PI) * 0.06
      camera.position.x = reducedMotion ? 0 : Math.sin(rotation * Math.PI * 0.9) * 0.42
      camera.position.y = reducedMotion ? 0 : Math.sin(rotation * Math.PI) * 0.16
      camera.position.z = 8.4 - morph * 0.55 + easeExplosion * 3.1
      camera.lookAt(0, 0, 0)
      material.opacity = 0.94 - easeExplosion * 0.72
      renderer.render(scene, camera)
      animationFrame = requestAnimationFrame(render)
    }

    const startRendering = () => {
      if (running) return
      running = true
      render()
    }

    const trigger = ScrollTrigger.create({
      trigger: root,
      pin: stage,
      start: 'top top',
      end: () => `+=${window.matchMedia('(max-width: 768px)').matches ? 4200 : 6000}`,
      scrub: 0.35,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        state.progress = self.progress
        startRendering()
        clearTimeout(settledTimer)
        if (self.progress > 0.995) {
          settledTimer = window.setTimeout(() => {
            running = false
            cancelAnimationFrame(animationFrame)
          }, 900)
        }
        gsap.set(leftCopyRef.current, {
          xPercent: -self.progress * 115,
          yPercent: -self.progress * 25,
          rotation: -self.progress * 10,
          opacity: 1 - self.progress * 0.92,
        })
        gsap.set(rightCopyRef.current, {
          xPercent: self.progress * 115,
          yPercent: self.progress * 25,
          rotation: self.progress * 9,
          opacity: 1 - self.progress * 0.92,
        })
        gsap.set(technicalRef.current, { opacity: 0.35 - self.progress * 0.28 })
      },
    })

    const loader = new THREE.TextureLoader()
    const texture = loader.load(portraitUrl, (loadedTexture) => {
      portrait = createPortraitTargets(loadedTexture.image, count)
      loadedTexture.dispose()
      startRendering()
    })
    texture.colorSpace = THREE.SRGBColorSpace

    resize()
    window.addEventListener('resize', resize)
    render()

    return () => {
      clearTimeout(settledTimer)
      cancelAnimationFrame(animationFrame)
      trigger.kill()
      window.removeEventListener('resize', resize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <section ref={rootRef} className="hero" aria-labelledby="hero-title">
      <div ref={stageRef} className="hero__stage">
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
        <div className="hero__copy hero__copy--left" ref={leftCopyRef}>Hi, I am</div>
        <h1 id="hero-title" className="sr-only">Harry Jees</h1>
        <div className="hero__copy hero__copy--right" ref={rightCopyRef}>Welcome to my portfolio</div>
        <div ref={technicalRef} className="hero__technical" aria-hidden="true">&lt; / &gt;</div>
      </div>
    </section>
  )
}
