import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import anime from 'animejs/lib/anime.es.js'

gsap.registerPlugin(ScrollTrigger)

export function AnimationFoundation({ children }) {
  const lenisRef = useRef(null)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const lenis = new Lenis({
      autoRaf: false,
      lerp: reducedMotion ? 1 : 0.22,
      smoothWheel: !reducedMotion,
      syncTouch: false,
      wheelMultiplier: 1,
    })
    lenisRef.current = lenis

    const raf = (time) => {
      // GSAP's ticker time is seconds; Lenis' raf timestamp is milliseconds.
      lenis.raf(time * 1000)
      ScrollTrigger.update()
    }

    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh, { once: true })
    requestAnimationFrame(refresh)

    // Keep the micro-interaction engine available to future section scopes.
    window.__portfolioMotion = { anime, gsap, ScrollTrigger, lenis }

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenisRef.current = null
      delete window.__portfolioMotion
    }
  }, [])

  return children
}
