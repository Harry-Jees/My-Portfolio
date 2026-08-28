import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const journeyStages = [
  { name: 'development', x: 10, y: 78 },
  { name: 'learning', x: 27, y: 30 },
  { name: 'growth', x: 47, y: 46 },
  { name: 'progress', x: 68, y: 68 },
  { name: 'evolution', x: 91, y: 23 },
]

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function Journey() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)
  const eyebrowRef = useRef(null)
  const titleRef = useRef(null)
  const pathGroupRef = useRef(null)
  const pathRef = useRef(null)
  const travellingPointRef = useRef(null)
  const currentStageRef = useRef(null)
  const [currentStage, setCurrentStage] = useState(journeyStages[0].name)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const path = pathRef.current
    const travellingPoint = travellingPointRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let pathLength = 1
    const context = gsap.context(() => {
      pathLength = path.getTotalLength()
      path.style.strokeDasharray = pathLength
      path.style.strokeDashoffset = pathLength

      gsap.set([contentRef.current, eyebrowRef.current, titleRef.current, pathGroupRef.current], {
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
          const pathProgress = clamp((progress - 0.08) / 0.86, 0, 1)
          const pointIndex = Math.min(journeyStages.length - 1, Math.floor(clamp(pathProgress * journeyStages.length, 0, journeyStages.length - 0.001)))

          gsap.set(contentRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 28 })
          gsap.set(eyebrowRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 22 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.12) * 1.3, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.12) * 1.3, 0, 1)) * 24 })
          gsap.set(pathGroupRef.current, {
            opacity: clamp((reveal - 0.15) * 1.25, 0, 1),
            y: reducedMotion ? 0 : (1 - clamp((reveal - 0.15) * 1.25, 0, 1)) * 22,
            x: reducedMotion ? 0 : (1 - easedReveal) * 6,
            rotation: reducedMotion ? 0 : (1 - easedReveal) * -2,
            scale: reducedMotion ? 1 : 0.96 + easedReveal * 0.04,
            transformOrigin: '50% 50%',
          })

          path.style.strokeDashoffset = pathLength * (1 - pathProgress)
          const point = path.getPointAtLength(pathLength * pathProgress)
          travellingPoint.setAttribute('cx', point.x)
          travellingPoint.setAttribute('cy', point.y)

          if (journeyStages[pointIndex].name !== currentStageRef.current) {
            currentStageRef.current = journeyStages[pointIndex].name
            setCurrentStage(journeyStages[pointIndex].name)
          }
        },
      })

      ScrollTrigger.refresh()
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className="journey" aria-labelledby="journey-title">
      <div ref={stageRef} className="journey__stage">
        <div ref={contentRef} className="journey__content">
          <p ref={eyebrowRef} className="journey__eyebrow">Journey / development and progression</p>
          <h2 ref={titleRef} id="journey-title">A path through growth.</h2>
          <p className="journey__current" aria-live="polite">{currentStage}</p>
        </div>

        <svg className="journey__map" viewBox="0 0 100 100" role="img" aria-label="A flowing path representing development and progression">
          <g ref={pathGroupRef} className="journey__path-group">
            <path ref={pathRef} className="journey__path" d="M 10 78 C 17 76, 19 35, 27 30 S 39 42, 47 46 S 60 84, 68 68 S 81 22, 91 23" />
            {journeyStages.map((journeyStage) => (
              <circle className="journey__node" key={journeyStage.name} cx={journeyStage.x} cy={journeyStage.y} r="0.8" />
            ))}
            <circle ref={travellingPointRef} className="journey__travelling-point" cx="10" cy="78" r="1.3" />
          </g>
        </svg>

        <div className="journey__axis journey__axis--top" aria-hidden="true">connection → direction</div>
        <div className="journey__axis journey__axis--bottom" aria-hidden="true">growth / learning / progress / evolution</div>
      </div>
    </section>
  )
}
