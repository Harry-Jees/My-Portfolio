import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Keep the documented capability language as the primary interaction model.
// Supporting technologies are shown only where the guides establish a clear
// relationship with that capability.
const technologies = [
  { name: 'Agentic orchestration' },
  { name: 'Prompt engineering' },
  { name: 'AI-powered applications' },
  { name: 'Requirement gathering' },
  { name: 'Deployment phases' },
  { name: 'Documentation' },
  { name: 'Product development' },
  { name: 'Creative problem solving' },
  { name: 'UI/UX' },
  { name: 'Front-end development' },
  { name: 'Web animation' },
  { name: '3D presentation' },
  { name: 'Cinematic interaction' },
  { name: 'Interactive experiences' },
]

const categories = [
  { name: 'Agentic Development', technologies: ['Agentic orchestration', 'Prompt engineering', 'AI-powered applications'] },
  { name: 'Loop Engineering', technologies: ['Requirement gathering', 'Deployment phases', 'Documentation'] },
  { name: 'Product Development Principles', technologies: ['Product development', 'Creative problem solving'] },
  { name: 'UI/UX', technologies: ['UI/UX', 'Front-end development', 'Web animation', '3D presentation', 'Cinematic interaction', 'Interactive experiences'] },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getTechnology(name) {
  return technologies.find((technology) => technology.name === name)
}

export function Skills() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const visualRef = useRef(null)
  const titleRef = useRef(null)
  const categoryRefs = useRef([])
  const technologyRefs = useRef({})
  const scrollProgressRef = useRef(0)
  const manualSelectionProgressRef = useRef(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)
  const [connections, setConnections] = useState([])
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 })

  const activeCategory = categories[activeIndex]
  const activeTechnologies = activeCategory.technologies.map(getTechnology)

  const selectCategory = (index) => {
    manualSelectionProgressRef.current = scrollProgressRef.current
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  useLayoutEffect(() => {
    const visual = visualRef.current
    if (!visual) return undefined

    let frame = 0
    const updateConnections = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const visualRect = visual.getBoundingClientRect()
        setSvgSize({ width: visualRect.width, height: visualRect.height })
        const activeCategoryElement = categoryRefs.current[activeIndex]
        if (!activeCategoryElement) return
        const categoryRect = activeCategoryElement.getBoundingClientRect()
        const categoryPoint = {
          x: categoryRect.left + categoryRect.width / 2 - visualRect.left,
          y: categoryRect.top + categoryRect.height / 2 - visualRect.top,
        }
        const hubPoint = { x: visualRect.width / 2, y: visualRect.height * 0.52 }
        const nextConnections = [{ kind: 'category', x1: hubPoint.x, y1: hubPoint.y, x2: categoryPoint.x, y2: categoryPoint.y }]

        activeCategory.technologies.forEach((technologyName) => {
          const element = technologyRefs.current[technologyName]
          if (!element) return
          const rect = element.getBoundingClientRect()
          nextConnections.push({
            kind: 'technology',
            x1: categoryPoint.x,
            y1: categoryPoint.y,
            x2: rect.left + rect.width / 2 - visualRect.left,
            y2: rect.top + rect.height / 2 - visualRect.top,
          })
        })
        setConnections(nextConnections)
      })
    }

    const resizeObserver = new ResizeObserver(updateConnections)
    resizeObserver.observe(visual)
    window.addEventListener('resize', updateConnections)
    updateConnections()

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateConnections)
    }
  }, [activeIndex, activeCategory.technologies])

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      gsap.set([titleRef.current, visualRef.current], {
        opacity: 0,
        y: reducedMotion ? 0 : 32,
      })

      ScrollTrigger.create({
        trigger: root,
        pin: stage,
        start: 'top top',
        end: () => `+=${window.matchMedia('(max-width: 768px)').matches ? 1800 : 2400}`,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const reveal = clamp(progress / 0.16, 0, 1)
          const easedReveal = reveal * reveal * (3 - 2 * reveal)
          scrollProgressRef.current = progress

          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.1) * 1.25, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.25, 0, 1)) * 32 })
          gsap.set(visualRef.current, {
            opacity: clamp((reveal - 0.38) * 1.5, 0, 1),
            y: reducedMotion ? 0 : (1 - clamp((reveal - 0.38) * 1.5, 0, 1)) * 22,
          })

          if (manualSelectionProgressRef.current !== null && Math.abs(progress - manualSelectionProgressRef.current) < 0.08) return
          manualSelectionProgressRef.current = null
          const index = Math.min(categories.length - 1, Math.floor(clamp(progress * categories.length, 0, categories.length - 0.001)))
          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index
            setActiveIndex(index)
          }
        },
      })

      ScrollTrigger.refresh()
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className="skills" aria-labelledby="skills-title">
      <div ref={stageRef} className="skills__stage">
        <div className="skills__intro">
          <h2 ref={titleRef} id="skills-title">Tools I use to turn ideas into things.</h2>
        </div>

        <div ref={visualRef} className="skills__visual">
          <svg
            className="skills__connections"
            viewBox={`0 0 ${svgSize.width || 1} ${svgSize.height || 1}`}
            aria-hidden="true"
          >
            {connections.map((connection, index) => (
              <line
                key={`${connection.kind}-${index}`}
                className={connection.kind === 'technology' ? 'is-active' : ''}
                x1={connection.x1}
                y1={connection.y1}
                x2={connection.x2}
                y2={connection.y2}
              />
            ))}
          </svg>

          <div className="skills__hub" aria-hidden="true" />

          <div className="skills__categories" role="group" aria-label="Skill categories">
            {categories.map((category, index) => (
              <button
                key={category.name}
                ref={(element) => { categoryRefs.current[index] = element }}
                className={`skills__category ${index === activeIndex ? 'is-active' : ''}`}
                type="button"
                aria-pressed={index === activeIndex}
                onClick={() => selectCategory(index)}
              >
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="skills__detail" aria-live="polite">
            <p className="skills__detail-label">{activeCategory.name}</p>
            <div className="skills__technology-list">
              {activeTechnologies.map((technology) => (
                <span
                  className="skills__technology"
                  key={technology.name}
                  ref={(element) => { technologyRefs.current[technology.name] = element }}
                >
                  {technology.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
