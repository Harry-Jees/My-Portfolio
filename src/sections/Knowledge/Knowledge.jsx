import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const topics = [
  'Agentic Programming',
  'Loop Engineering',
  'Product Development Principles',
  'UI/UX',
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function Knowledge() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)
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
      gsap.set([contentRef.current, eyebrowRef.current, titleRef.current, descriptionRef.current, clusterRef.current], {
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
          gsap.set(eyebrowRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 22 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.1) * 1.3, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.1) * 1.3, 0, 1)) * 22 })
          gsap.set(descriptionRef.current, { opacity: clamp((reveal - 0.25) * 1.35, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.25) * 1.35, 0, 1)) * 18 })
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
          <p ref={descriptionRef} className="knowledge__description">
            Harry has experience taking classes and teaching sessions in colleges.
          </p>
        </div>

        <div ref={clusterRef} className="knowledge__cluster" aria-hidden="true">
          <svg className="knowledge__network" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path className="knowledge__network-path" d="M 8 52 C 23 52, 24 20, 42 28 S 57 77, 73 61 S 85 36, 96 45" />
            <path className="knowledge__network-path knowledge__network-path--secondary" d="M 8 52 C 29 48, 38 48, 50 52 S 70 58, 96 45" />
            {topics.map((topic, index) => (
              <circle className={`knowledge__network-node ${index === activeIndex ? 'is-active' : ''}`} key={topic} cx={12 + index * 21} cy={index % 2 === 0 ? 52 : 30 + index * 8} r={index === activeIndex ? 1.4 : 0.8} />
            ))}
          </svg>

          <div className="knowledge__topics" role="group" aria-label="Teaching topics">
            {topics.map((topic, index) => (
              <button
                key={topic}
                type="button"
                className={`knowledge__topic ${index === activeIndex ? 'is-active' : ''}`}
                aria-pressed={index === activeIndex}
                onClick={() => selectTopic(index)}
              >
                <span className="knowledge__topic-index">0{index + 1}</span>
                <span>{topic}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
