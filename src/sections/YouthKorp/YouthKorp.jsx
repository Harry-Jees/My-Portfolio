import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import logoUrl from '../../../yklogo.avif'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export function YouthKorp() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const contentRef = useRef(null)
  const logoRef = useRef(null)
  const titleRef = useRef(null)
  const descriptionRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    const stage = stageRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      gsap.set([contentRef.current, logoRef.current, titleRef.current, descriptionRef.current], {
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
          gsap.set(contentRef.current, { opacity: easedReveal, y: reducedMotion ? 0 : (1 - easedReveal) * 28 })
          gsap.set(logoRef.current, { opacity: clamp((reveal - 0.08) * 1.35, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.08) * 1.35, 0, 1)) * 20 })
          gsap.set(titleRef.current, { opacity: clamp((reveal - 0.2) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.2) * 1.4, 0, 1)) * 22 })
          gsap.set(descriptionRef.current, { opacity: clamp((reveal - 0.34) * 1.4, 0, 1), y: reducedMotion ? 0 : (1 - clamp((reveal - 0.34) * 1.4, 0, 1)) * 18 })
        },
      })
      ScrollTrigger.refresh()
    }, root)

    return () => {
      context.revert()
    }
  }, [])

  return (
    <section ref={rootRef} className="youth-korp" aria-labelledby="youth-korp-title">
      <div ref={stageRef} className="youth-korp__stage">
        <div ref={contentRef} className="youth-korp__content">
          <div className="youth-korp__copy">
            <h2 ref={titleRef} id="youth-korp-title">Founder of Youth Korp</h2>
            <p ref={descriptionRef} className="youth-korp__description">
              Youth Korp is a project incubation community. It helps student ideas move toward real products. It brings innovation and collaboration into one space. The community is built by students for students. Its focus is learning, building, and scaling together.
            </p>
          </div>
          <img ref={logoRef} className="youth-korp__logo" src={logoUrl} alt="Youth Korp logo" />
        </div>
      </div>
    </section>
  )
}
