import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StickMan() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Animate stickman falling with scroll
    const ctx = gsap.context(() => {
      // Main falling motion — stickman follows the page scroll
      gsap.to(el, {
        y: () => document.documentElement.scrollHeight - window.innerHeight,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2,
          onUpdate: (self) => {
            const rect = el.getBoundingClientRect()
            const cx = rect.left + rect.width / 2
            const cy = rect.top + rect.height / 2 + window.scrollY
            window.__stickmanPos = { x: cx, y: cy }

            // Rotate slightly based on velocity
            const vel = self.getVelocity()
            const rot = Math.min(15, Math.max(-15, vel * 0.003))
            gsap.to(el, { rotation: rot, duration: 0.3, overwrite: 'auto' })

            // Animate limbs based on scroll speed
            const limbAngle = Math.sin(self.progress * 30) * 25
            const leftArm = el.querySelector('#left-arm')
            const rightArm = el.querySelector('#right-arm')
            const leftLeg = el.querySelector('#left-leg')
            const rightLeg = el.querySelector('#right-leg')
            if (leftArm) leftArm.style.transform = `rotate(${limbAngle}deg)`
            if (rightArm) rightArm.style.transform = `rotate(${-limbAngle}deg)`
            if (leftLeg) leftLeg.style.transform = `rotate(${-limbAngle * 0.8}deg)`
            if (rightLeg) rightLeg.style.transform = `rotate(${limbAngle * 0.8}deg)`
          }
        }
      })
    })

    return () => {
      ctx.revert()
      window.__stickmanPos = null
    }
  }, [])

  return (
    <div
      ref={ref}
      className="fixed right-[8%] top-[30vh] z-40 pointer-events-none select-none"
      style={{ willChange: 'transform' }}
    >
      <svg width="48" height="72" viewBox="0 0 48 72" fill="none">
        {/* Head */}
        <circle cx="24" cy="10" r="8" stroke="#4F46E5" strokeWidth="2.5" fill="white"/>
        {/* Eyes */}
        <circle cx="21" cy="9" r="1.5" fill="#4F46E5"/>
        <circle cx="27" cy="9" r="1.5" fill="#4F46E5"/>
        {/* Smile */}
        <path d="M21 13 Q24 16 27 13" stroke="#4F46E5" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
        {/* Body */}
        <line x1="24" y1="18" x2="24" y2="42" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
        {/* Left Arm */}
        <g id="left-arm" style={{ transformOrigin: '24px 24px' }}>
          <line x1="24" y1="24" x2="10" y2="34" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Right Arm */}
        <g id="right-arm" style={{ transformOrigin: '24px 24px' }}>
          <line x1="24" y1="24" x2="38" y2="34" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Left Leg */}
        <g id="left-leg" style={{ transformOrigin: '24px 42px' }}>
          <line x1="24" y1="42" x2="12" y2="62" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="12" y1="62" x2="8" y2="68" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
        {/* Right Leg */}
        <g id="right-leg" style={{ transformOrigin: '24px 42px' }}>
          <line x1="24" y1="42" x2="36" y2="62" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="36" y1="62" x2="40" y2="68" stroke="#4F46E5" strokeWidth="2.5" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  )
}
