import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import logoUrl from '../../../yklogo.avif'

const NODE_COUNT = 42

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function createNetworkData() {
  const nodes = []
  const directions = []
  for (let index = 0; index < NODE_COUNT; index += 1) {
    const angle = (index / NODE_COUNT) * Math.PI * 2
    const ring = 1.4 + (index % 5) * 0.28
    nodes.push([
      Math.cos(angle) * ring + (Math.random() - 0.5) * 0.55,
      Math.sin(angle) * ring * 0.72 + (Math.random() - 0.5) * 0.4,
      (Math.random() - 0.5) * 1.8,
    ])
    directions.push([
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.08,
      (Math.random() - 0.5) * 0.05,
    ])
  }

  const edges = []
  for (let index = 0; index < NODE_COUNT; index += 1) {
    edges.push([index, (index + 1) % NODE_COUNT])
    if (index % 3 === 0) edges.push([index, (index + 7) % NODE_COUNT])
  }

  return { nodes, directions, edges }
}

export function YouthKorp() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const canvasRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const progressRef = useRef(0)
  const [webglAvailable, setWebglAvailable] = useState(true)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const canvas = canvasRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let renderer
    let scene
    let camera
    let points
    let lines
    let pointsGeometry
    let linesGeometry
    let pointMaterial
    let lineMaterial
    let frame = 0
    let renderActive = false
    const data = createNetworkData()

    try {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100)
      camera.position.set(0, 0, 7.8)
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
      renderer.outputColorSpace = THREE.SRGBColorSpace

      pointsGeometry = new THREE.BufferGeometry()
      const pointPositions = new Float32Array(NODE_COUNT * 3)
      pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3))
      pointMaterial = new THREE.PointsMaterial({
        color: 0xe6e7e1,
        size: window.matchMedia('(max-width: 768px)').matches ? 0.065 : 0.05,
        transparent: true,
        opacity: 0.88,
        depthWrite: false,
      })
      points = new THREE.Points(pointsGeometry, pointMaterial)
      scene.add(points)

      linesGeometry = new THREE.BufferGeometry()
      linesGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(data.edges.length * 6), 3))
      lineMaterial = new THREE.LineBasicMaterial({ color: 0x6d6e68, transparent: true, opacity: 0.32 })
      lines = new THREE.LineSegments(linesGeometry, lineMaterial)
      scene.add(lines)
    } catch {
      setWebglAvailable(false)
    }

    const resize = () => {
      if (!renderer) return
      const width = stage.clientWidth
      const height = stage.clientHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    const render = () => {
      if (!renderActive || !renderer) return
      const progress = progressRef.current
      const expansion = clamp((progress - 0.04) / 0.28, 0, 1)
      const easedExpansion = expansion * expansion * (3 - 2 * expansion)
      const nodePositions = pointsGeometry.attributes.position.array
      const linePositions = linesGeometry.attributes.position.array

      for (let index = 0; index < NODE_COUNT; index += 1) {
        const node = data.nodes[index]
        const direction = data.directions[index]
        const offset = index * 3
        const drift = reducedMotion ? 0 : Math.sin(performance.now() * 0.00035 + index) * 0.025
        nodePositions[offset] = node[0] * easedExpansion + direction[0] * (1 - easedExpansion) + drift
        nodePositions[offset + 1] = node[1] * easedExpansion + direction[1] * (1 - easedExpansion) + drift * 0.6
        nodePositions[offset + 2] = node[2] * easedExpansion + direction[2] * (1 - easedExpansion)
      }

      data.edges.forEach(([start, end], index) => {
        const lineOffset = index * 6
        const startOffset = start * 3
        const endOffset = end * 3
        linePositions[lineOffset] = nodePositions[startOffset]
        linePositions[lineOffset + 1] = nodePositions[startOffset + 1]
        linePositions[lineOffset + 2] = nodePositions[startOffset + 2]
        linePositions[lineOffset + 3] = nodePositions[endOffset]
        linePositions[lineOffset + 4] = nodePositions[endOffset + 1]
        linePositions[lineOffset + 5] = nodePositions[endOffset + 2]
      })

      pointsGeometry.attributes.position.needsUpdate = true
      linesGeometry.attributes.position.needsUpdate = true
      points.rotation.y = reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.08
      camera.position.x = reducedMotion ? 0 : Math.sin(progress * Math.PI) * 0.22
      camera.position.z = 7.8 - easedExpansion * 0.45
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }

    const setRenderActive = (active) => {
      renderActive = active
      if (active && !frame) render()
      if (!active) {
        cancelAnimationFrame(frame)
        frame = 0
      }
    }

    const observer = new IntersectionObserver(([entry]) => setRenderActive(entry.isIntersecting), { rootMargin: '25% 0px 25% 0px' })
    observer.observe(root)

    const context = gsap.context(() => {
      gsap.set([contentRef.current, eyebrowRef.current, logoRef.current, titleRef.current, descriptionRef.current], {
        opacity: 0,
        y: reducedMotion ? 0 : 28,
      })

      ScrollTrigger.create({
        trigger: root,
        pin: stage,
        start: 'top top',
        end: () => `+=${window.matchMedia('(max-width: 768px)').matches ? 1900 : 2400}`,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const reveal = clamp(progress / 0.16, 0, 1)
          const easedReveal = reveal * reveal * (3 - 2 * reveal)
          progressRef.current = progress
          gsap.set(contentRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 28 })
          gsap.set(eyebrowRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 24 })
          gsap.set(logoRef.current, { opacity: clamp((reveal - 0.08) * 1.35, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.08) * 1.35, 0, 1)) * 20 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.2) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.2) * 1.4, 0, 1)) * 22 })
          gsap.set(descriptionRef.current, { opacity: clamp((reveal - 0.34) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.34) * 1.4, 0, 1)) * 18 })
        },
      })
      ScrollTrigger.refresh()
    }, root)

    resize()
    window.addEventListener('resize', resize)

    return () => {
      observer.disconnect()
      setRenderActive(false)
      window.removeEventListener('resize', resize)
      context.revert()
      pointsGeometry?.dispose()
      linesGeometry?.dispose()
      pointMaterial?.dispose()
      lineMaterial?.dispose()
      renderer?.dispose()
      scene?.clear()
    }
  }, [])

  return (
    <section ref={rootRef} className="youth-korp" aria-labelledby="youth-korp-title">
      <div ref={stageRef} className="youth-korp__stage">
        <canvas ref={canvasRef} className="youth-korp__canvas" aria-hidden="true" />
        <div ref={contentRef} className="youth-korp__content">
          <p ref={eyebrowRef} className="youth-korp__eyebrow">Community / connection</p>
          <img ref={logoRef} className="youth-korp__logo" src={logoUrl} alt="Youth Korp logo" />
          <h2 ref={titleRef} id="youth-korp-title">Founder of Youth Korp</h2>
          <p ref={descriptionRef} className="youth-korp__description">A project incubation and innovation scaling community built by students for students.</p>
          {!webglAvailable && <p className="youth-korp__fallback">Youth Korp</p>}
        </div>
        <div className="youth-korp__caption" aria-hidden="true">students / ideas / connections</div>
      </div>
    </section>
  )
}
