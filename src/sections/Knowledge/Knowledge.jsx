import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const topics = [
  {
    name: 'Agentic Programming',
    description: 'Building with AI systems, agentic development, orchestration, and prompts that turn ideas into useful software.',
  },
  {
    name: 'Loop Engineering',
    description: 'Moving from an early idea to a working product through requirements, development, deployment phases, and documentation.',
  },
  {
    name: 'Product Development Principles',
    description: 'Connecting product thinking with creative problem solving so software answers a real need and remains grounded in people.',
  },
  {
    name: 'UI/UX',
    description: 'Exploring front-end development, web animation, 3D presentation, and cinematic interaction to make digital experiences clear and memorable.',
  },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function Knowledge() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  const clusterRef = useRef(null)
  const activeIndexRef = useRef(0)
  const scrollProgressRef = useRef(0)
  const manualSelectionProgressRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const selectTopic = (index) => {
    manualSelectionProgressRef.current = scrollProgressRef.current
    activeIndexRef.current = index
    setActiveIndex(index)
  }

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      gsap.set([contentRef.current, titleRef.current, clusterRef.current], {
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
          const index = Math.min(topics.length - 1, Math.floor(clamp(progress * topics.length, 0, topics.length - 0.001)))
          scrollProgressRef.current = progress

          gsap.set(contentRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 28 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.1) * 1.3, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.3, 0, 1)) * 22 })
          gsap.set(clusterRef.current, {
            opacity: clamp((reveal - 0.18) * 1.25, 0, 1),
            y: reducedMotion ? 0 : (1 - clamp((reveal - 0.18) * 1.25, 0, 1)) * 20,
            x: reducedMotion ? 0 : Math.sin(progress * Math.PI) * 18,
            rotation: reducedMotion ? 0 : (1 - easedReveal) * -3,
            scale: reducedMotion ? 1 : 0.94 + easedReveal * 0.06,
          })
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

  return (
    <section ref={rootRef} className="knowledge" aria-labelledby="knowledge-title">
      <div ref={stageRef} className="knowledge__stage">
        <div ref={contentRef} className="knowledge__content">
          <h2 ref={titleRef} id="knowledge-title">Ideas are better when they are shared.</h2>
          <div ref={descriptionRef} className="knowledge__description">
            <p>I’ve had the opportunity to conduct learning sessions at Kristu Jyoti College of Management and Technology and St. Berchmans College, sharing practical insights on Agentic Programming, Prompt Engineering, Product Development, and modern AI workflows.</p>
          </div>
        </div>

        <div ref={clusterRef} className="knowledge__cluster">
          <div className="knowledge__topics" role="group" aria-label="Teaching topics">
            {topics.map((topic, index) => (
              <button
                key={topic.name}
                type="button"
                className={`knowledge__topic ${index === activeIndex ? 'is-active' : ''}`}
                aria-pressed={index === activeIndex}
                aria-current={index === activeIndex ? 'step' : undefined}
                onClick={() => selectTopic(index)}
              >
                <span className="knowledge__topic-index">0{index + 1}</span>
                <span className="knowledge__topic-heading">{topic.name}</span>
                <span className="knowledge__topic-description">{topic.description}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
