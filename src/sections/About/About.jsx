import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function About() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const trackRef = useRef(null)
  const atmosphereRef = useRef(null)
  const labelRef = useRef(null)
  const headingRef = useRef(null)
  const introRef = useRef(null)
  const statementRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const track = trackRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const refreshOnResize = () => ScrollTrigger.refresh()
    const context = gsap.context(() => {
      const setInitial = () => {
        gsap.set([labelRef.current, headingRef.current, introRef.current, statementRef.current], {
          opacity: 0,
          x: reducedMotion ? 0 : 48,
        })
        gsap.set(stage, {
          opacity: 0,
          x: reducedMotion ? 0 : '8vw',
          scale: reducedMotion ? 1 : 0.985,
        })
      }

      setInitial()
      const travel = () => Math.max(0, track.scrollWidth - stage.clientWidth)
      const trigger = ScrollTrigger.create({
        trigger: root,
        pin: stage,
        start: 'top top',
        end: () => `+=${window.matchMedia('(max-width: 768px)').matches ? 1900 : 2600}`,
        scrub: 0.35,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress
          const entrance = Math.min(1, progress / 0.12)
          const entranceEase = entrance * entrance * (3 - 2 * entrance)
          const horizontalProgress = Math.min(1, Math.max(0, (progress - 0.08) / 0.84))
          const maxTravel = travel()

          gsap.set(stage, {
            opacity: entranceEase,
            x: reducedMotion ? 0 : `${(1 - entranceEase) * 8}vw`,
            scale: reducedMotion ? 1 : 0.985 + entranceEase * 0.015,
          })
          gsap.set(track, { x: reducedMotion ? 0 : -maxTravel * horizontalProgress })
          gsap.set(atmosphereRef.current, {
            x: reducedMotion ? 0 : -horizontalProgress * 28,
            y: reducedMotion ? 0 : Math.sin(progress * Math.PI) * -18,
            opacity: 0.46 - progress * 0.12,
          })
          gsap.set(labelRef.current, {
            opacity: Math.min(1, entranceEase * 1.5),
            x: reducedMotion ? 0 : (1 - entranceEase) * 48,
          })
          gsap.set(headingRef.current, {
            opacity: Math.min(1, Math.max(0, (entrance - 0.12) * 1.35)),
            x: reducedMotion ? 0 : (1 - Math.min(1, Math.max(0, (entrance - 0.12) * 1.35))) * 48,
          })
          gsap.set(introRef.current, {
            opacity: Math.min(1, Math.max(0, (entrance - 0.3) * 1.5)),
            x: reducedMotion ? 0 : (1 - Math.min(1, Math.max(0, (entrance - 0.3) * 1.5))) * 42,
          })
          gsap.set(statementRef.current, {
            opacity: Math.min(1, Math.max(0, (entrance - 0.48) * 1.8)),
            x: reducedMotion ? 0 : (1 - Math.min(1, Math.max(0, (entrance - 0.48) * 1.8))) * 36,
          })
        },
      })

      window.addEventListener('resize', refreshOnResize)
      ScrollTrigger.refresh()
    }, root)

    return () => {
      window.removeEventListener('resize', refreshOnResize)
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="about" aria-labelledby="about-title">
      <div ref={stageRef} className="about__stage">
        <div ref={atmosphereRef} className="about__atmosphere" aria-hidden="true">
          <span className="about__atmosphere-line" />
          <span className="about__atmosphere-index">01 / 04</span>
        </div>
        <div ref={trackRef} className="about__track">
          <div className="about__panel about__panel--intro">
            <p ref={labelRef} className="about__eyebrow">About Harry Jees</p>
            <h2 ref={headingRef} id="about-title">I build things.</h2>
          </div>
          <div className="about__panel about__panel--profile">
            <p ref={introRef} className="about__copy">
              Harry Jees is a software and product builder interested in AI, agentic development, front-end development, and UI/UX.
            </p>
          </div>
          <div className="about__panel about__panel--statement">
            <p ref={statementRef} className="about__copy about__copy--statement">
              He enjoys turning ideas into actual products and experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
