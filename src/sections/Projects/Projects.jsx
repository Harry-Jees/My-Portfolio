import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { projects } from './projectData.js'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function Projects() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const introRef = useRef(null)
  const galleryRef = useRef(null)
  const descriptionRef = useRef(null)
  const projectRefs = useRef([])
  const activeIndexRef = useRef(0)
  const scrollProgressRef = useRef(0)
  const manualSelectionProgressRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const activeProject = projects[activeIndex]

  const selectProject = (index) => {
    manualSelectionProgressRef.current = scrollProgressRef.current
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      gsap.set([introRef.current, galleryRef.current, descriptionRef.current], {
        opacity: 0,
        y: reducedMotion ? 0 : 28,
      })

      ScrollTrigger.create({
        trigger: root,
        pin: stage,
        start: 'top top',
        end: () => `+=${window.matchMedia('(max-width: 768px)').matches ? 2400 : 3200}`,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const reveal = clamp(progress / 0.12, 0, 1)
          const easedReveal = reveal * reveal * (3 - 2 * reveal)
          const index = Math.min(projects.length - 1, Math.floor(clamp(progress * projects.length, 0, projects.length - 0.001)))
          scrollProgressRef.current = progress

          gsap.set(introRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 28 })
          gsap.set(galleryRef.current, { opacity: clamp((reveal - 0.1) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.4, 0, 1)) * 22 })
          gsap.set(descriptionRef.current, { opacity: clamp((reveal - 0.22) * 1.3, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.22) * 1.3, 0, 1)) * 18 })

          if (manualSelectionProgressRef.current !== null && Math.abs(progress - manualSelectionProgressRef.current) < 0.08) return
          manualSelectionProgressRef.current = null
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

  useEffect(() => {
    const previousIndex = projectRefs.current.findIndex((element) => element?.classList.contains('is-active'))
    const direction = activeIndex >= previousIndex ? 1 : -1
    projectRefs.current.forEach((element, index) => {
      if (!element) return
      if (index === activeIndex) {
        gsap.fromTo(element, {
          autoAlpha: 0,
          x: `${direction * 7}vw`,
          scale: 0.96,
        }, {
          autoAlpha: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          overwrite: true,
        })
      } else {
        gsap.to(element, {
          autoAlpha: 0,
          x: `${direction * -5}vw`,
          scale: 0.97,
          duration: 0.65,
          ease: 'power2.inOut',
          overwrite: true,
        })
      }
    })
  }, [activeIndex])

  return (
    <section ref={rootRef} className="projects" aria-labelledby="projects-title">
      <div ref={stageRef} className="projects__stage">
        <div ref={introRef} className="projects__intro">
          <p className="projects__eyebrow">Projects / proof of work</p>
          <h2 id="projects-title">What I create.</h2>
        </div>

        <nav className="projects__navigation" aria-label="Projects">
          {projects.map((project, index) => (
            <button
              key={project.id}
              type="button"
              className={`projects__tab ${index === activeIndex ? 'is-active' : ''}`}
              aria-pressed={index === activeIndex}
              onClick={() => selectProject(index)}
            >
              <span className="projects__tab-number">{project.number}</span>
              <span>{project.title}</span>
            </button>
          ))}
        </nav>

        <div ref={galleryRef} className="projects__gallery">
          {projects.map((project, index) => (
            <article
              key={project.id}
              ref={(element) => { projectRefs.current[index] = element }}
              className={`project-visual project-visual--${project.visual} ${index === activeIndex ? 'is-active' : ''}`}
              aria-hidden={index !== activeIndex}
            >
              <div className="project-visual__frame">
                <span className="project-visual__number">{project.number} / 04</span>
                {project.visual === 'pillow' && (
                  <div className="project-visual__pillow-mark"><span>PB</span><i /></div>
                )}
                {project.visual === 'bro' && (
                  <div className="project-visual__bro-system"><span>BUDDY</span><span>BRO</span><span>DUDE</span></div>
                )}
                {project.visual === 'school' && (
                  <div className="project-visual__school-type"><span>ST. THOMAS</span><strong>PUBLIC SCHOOL</strong></div>
                )}
                {project.visual === 'youth' && (
                  <div className="project-visual__youth-type"><span>YOUTH</span><strong>KORP</strong></div>
                )}
                <span className="project-visual__frame-label">documented project</span>
              </div>
            </article>
          ))}
        </div>

        <div ref={descriptionRef} className="projects__description" aria-live="polite">
          <p className="projects__project-number">PROJECT {activeProject.number}</p>
          <h3>{activeProject.title}</h3>
          <p className="projects__body">{activeProject.description}</p>
          <div className="projects__context" aria-label={`${activeProject.title} context`}>
            {activeProject.context.map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
      </div>
    </section>
  )
}
