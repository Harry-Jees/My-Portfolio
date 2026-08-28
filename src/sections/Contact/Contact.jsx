import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const contactLinks = [
  { label: 'Email', value: 'harryjees@gmail.com', href: 'mailto:harryjees@gmail.com' },
  { label: 'Phone', value: '+91 9400765473', href: 'tel:+919400765473' },
  { label: 'GitHub', value: 'Harry-Jees', href: 'https://github.com/Harry-Jees', external: true },
  { label: 'LinkedIn', value: 'harry-jees', href: 'https://www.linkedin.com/in/harry-jees', external: true },
  { label: 'Instagram', value: '@harry_jees', href: 'https://www.instagram.com/harry_jees/', external: true },
]

export function Contact() {
  const rootRef = useRef(null)
  const titleRef = useRef(null)
  const linksRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const context = gsap.context(() => {
      const elements = [titleRef.current, ...linksRef.current.children]
      gsap.set(elements, { opacity: 0, y: reducedMotion ? 0 : 24 })

      gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top 78%',
          once: true,
        },
        defaults: {
          ease: 'power3.out',
          duration: reducedMotion ? 0.01 : 0.9,
        },
      })
        .to(titleRef.current, { opacity: 1, y: 0 })
        .to(linksRef.current.children, { opacity: 1, y: 0, stagger: reducedMotion ? 0 : 0.09 }, '-=0.4')
    }, root)

    return () => context.revert()
  }, [])

  return (
    <section ref={rootRef} className="contact" aria-labelledby="contact-title">
      <div className="contact__content">
        <h2 ref={titleRef} id="contact-title">Let&apos;s build something meaningful together.</h2>

        <nav ref={linksRef} className="contact__links" aria-label="Contact links">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              className="contact__link"
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noreferrer' : undefined}
              aria-label={`${link.label}: ${link.value}`}
            >
              <span className="contact__link-label">{link.label}</span>
              <span className="contact__link-value">{link.value}</span>
            </a>
          ))}
        </nav>
      </div>
    </section>
  )
}
