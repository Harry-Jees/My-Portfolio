import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const categories = [
  {
    name: 'Programming',
    technologies: ['Python', 'JavaScript'],
    projects: ['Bro App'],
  },
  {
    name: 'Web',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    projects: ['St. Thomas Public School Website'],
  },
  {
    name: 'Mobile',
    technologies: ['Flutter'],
    projects: ['Pillow Bud'],
  },
  {
    name: 'Databases / Backend',
    technologies: ['MySQL', 'PostgreSQL', 'Supabase', 'Firebase', 'MongoDB'],
    projects: ['Bro App'],
  },
  {
    name: 'AI / Intelligent Applications',
    technologies: ['Gemini', 'Gemma', 'Google AI Studio', 'AI-assisted development', 'Agentic application development'],
    projects: ['Pillow Bud'],
  },
  {
    name: 'Development Tools / Platforms',
    technologies: ['GitHub', 'VS Code', 'Vercel', 'Google Cloud', 'Figma'],
    projects: [],
  },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function Skills() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const visualRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const introRef = useRef(null)
  const detailRef = useRef(null)
  const activeIndexRef = useRef(0)
  const [activeIndex, setActiveIndex] = useState(0)

  const selectCategory = (index) => {
    activeIndexRef.current = index
    setActiveIndex(index)
    gsap.fromTo(visualRef.current, { y: 8, opacity: 0.86 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power2.out', overwrite: true })
  }

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      gsap.set([eyebrowRef.current, titleRef.current, introRef.current, visualRef.current], {
        opacity: 0,
        y: reducedMotion ? 0 : 32,
      })

      const trigger = ScrollTrigger.create({
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
          const index = Math.min(categories.length - 1, Math.floor(clamp(progress * categories.length, 0, categories.length - 0.001)))
          const easedReveal = reveal * reveal * (3 - 2 * reveal)

          gsap.set(eyebrowRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 32 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.1) * 1.25, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.25, 0, 1)) * 32 })
          gsap.set(introRef.current, { opacity: clamp((reveal - 0.26) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.26) * 1.4, 0, 1)) * 24 })
          gsap.set(visualRef.current, {
            opacity: clamp((reveal - 0.38) * 1.5, 0, 1),
            y: reducedMotion ? 0 : (1 - clamp((reveal - 0.38) * 1.5, 0, 1)) * 22,
          })

          if (index !== activeIndexRef.current) {
            activeIndexRef.current = index
            setActiveIndex(index)
          }
        },
      })

      ScrollTrigger.refresh()
      return () => trigger.kill()
    }, root)

    return () => context.revert()
  }, [])

  const activeCategory = categories[activeIndex]

  return (
    <section ref={rootRef} className="skills" aria-labelledby="skills-title">
      <div ref={stageRef} className="skills__stage">
        <div className="skills__intro">
          <p ref={eyebrowRef} className="skills__eyebrow">Skills / capability map</p>
          <h2 ref={titleRef} id="skills-title">Tools I use to turn ideas into things.</h2>
          <p ref={introRef} className="skills__intro-copy">Technology becomes useful when it connects to something real.</p>
        </div>

        <div ref={visualRef} className="skills__visual">
          <svg className="skills__connections" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {categories.map((category, index) => (
              <line
                key={category.name}
                className={index === activeIndex ? 'is-active' : ''}
                x1="50"
                y1="52"
                x2={index % 2 === 0 ? '16' : '84'}
                y2={18 + (index % 3) * 32}
              />
            ))}
          </svg>

          <div className="skills__hub" aria-hidden="true">
            <span>build</span>
          </div>

          <div className="skills__categories" role="list" aria-label="Skill categories">
            {categories.map((category, index) => (
              <button
                key={category.name}
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

          <div className="skills__detail" ref={detailRef} aria-live="polite">
            <p className="skills__detail-label">{activeCategory.name}</p>
            <div className="skills__technology-list">
              {activeCategory.technologies.map((technology) => (
                <span className="skills__technology" key={technology}>{technology}</span>
              ))}
            </div>
            {activeCategory.projects.length > 0 && (
              <p className="skills__project-link">
                Used in <span>{activeCategory.projects.join(' · ')}</span>
              </p>
            )}
          </div>
        </div>

        <div className="skills__transition" aria-hidden="true">
          <span>What I use</span>
          <span className="skills__transition-line" />
          <span>What I build next</span>
        </div>
      </div>
    </section>
  )
}
