import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// A many-to-many model: technologies can belong to multiple categories and
// can connect to multiple documented projects.
const technologies = [
  { name: 'Python', categories: ['Programming', 'Desktop Applications'], projects: ['Bro App'] },
  { name: 'JavaScript', categories: ['Programming', 'Web'], projects: [] },
  { name: 'HTML', categories: ['Web'], projects: [] },
  { name: 'CSS', categories: ['Web'], projects: [] },
  { name: 'Front-end development', categories: ['Web', 'Product / Experience'], projects: ['St. Thomas Public School Website'] },
  { name: 'UI/UX', categories: ['Web', 'Product / Experience'], projects: [] },
  { name: 'MySQL', categories: ['Desktop Applications'], projects: ['Bro App'] },
  { name: 'CustomTkinter', categories: ['Desktop Applications'], projects: ['Bro App'] },
  { name: 'Agentic development', categories: ['AI / Agentic Development'], projects: [] },
  { name: 'Agentic orchestration', categories: ['AI / Agentic Development'], projects: [] },
  { name: 'Prompt engineering', categories: ['AI / Agentic Development'], projects: [] },
  { name: 'AI-powered applications', categories: ['AI / Agentic Development'], projects: ['Pillow Bud'] },
  { name: 'Product development', categories: ['Product / Experience'], projects: [] },
  { name: 'Creative problem solving', categories: ['Product / Experience'], projects: [] },
  { name: 'Web animation', categories: ['Product / Experience'], projects: [] },
  { name: '3D presentation', categories: ['Product / Experience'], projects: [] },
  { name: 'Cinematic interaction', categories: ['Product / Experience'], projects: [] },
  { name: 'Interactive experiences', categories: ['Product / Experience'], projects: [] },
]

const categories = [
  { name: 'Programming', technologies: ['Python', 'JavaScript'] },
  { name: 'Web', technologies: ['HTML', 'CSS', 'JavaScript', 'Front-end development', 'UI/UX'] },
  { name: 'Desktop Applications', technologies: ['Python', 'CustomTkinter', 'MySQL'] },
  { name: 'AI / Agentic Development', technologies: ['Agentic development', 'Agentic orchestration', 'Prompt engineering', 'AI-powered applications'] },
  { name: 'Product / Experience', technologies: ['UI/UX', 'Front-end development', 'Product development', 'Creative problem solving', 'Web animation', '3D presentation', 'Cinematic interaction', 'Interactive experiences'] },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

function getTechnology(name) {
  return technologies.find((technology) => technology.name === name)
}

function getUniqueProjects(activeTechnologies) {
  return [...new Set(activeTechnologies.flatMap((technology) => technology.projects))]
}

export function Skills() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const visualRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
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
  const activeProjects = getUniqueProjects(activeTechnologies)

  const selectCategory = (index) => {
    manualSelectionProgressRef.current = scrollProgressRef.current
    activeIndexRef.current = index
    setActiveIndex(index)
    gsap.fromTo(visualRef.current, { y: 8, opacity: 0.86 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
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
      gsap.set([eyebrowRef.current, titleRef.current, introRef.current, visualRef.current], {
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

          gsap.set(eyebrowRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 32 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.1) * 1.25, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.25, 0, 1)) * 32 })
          gsap.set(introRef.current, { opacity: clamp((reveal - 0.26) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.26) * 1.4, 0, 1)) * 24 })
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
          <p ref={eyebrowRef} className="skills__eyebrow">Skills / capability map</p>
          <h2 ref={titleRef} id="skills-title">Tools I use to turn ideas into things.</h2>
          <p ref={introRef} className="skills__intro-copy">Technology becomes useful when it connects to something real.</p>
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

          <div className="skills__hub" aria-hidden="true"><span>build</span></div>

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
                <span className="skills__category-index">0{index + 1}</span>
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
            {activeProjects.length > 0 && (
              <p className="skills__project-link">Used in <span>{activeProjects.join(' · ')}</span></p>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
