import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ------------------------------------------------------------------
// Per-tentacle personality: each has its own frequency, amplitude
// and phase so they NEVER move in sync — exactly like a real octopus
// ------------------------------------------------------------------
const TENTACLE_DNA = [
  // id  freq1  freq2  amp1  amp2  phase  baseSpread  dir
  { freq1: 1.10, freq2: 2.30, amp1: 18, amp2: 7,  phase: 0.00, baseSpread: -7,  dir: -1 }, // t1
  { freq1: 0.95, freq2: 1.85, amp1: 14, amp2: 5,  phase: 0.60, baseSpread: -4,  dir: -1 }, // t2
  { freq1: 1.30, freq2: 2.70, amp1: 10, amp2: 4,  phase: 1.20, baseSpread: -2,  dir: -1 }, // t3
  { freq1: 0.80, freq2: 1.60, amp1:  7, amp2: 3,  phase: 1.80, baseSpread: -1,  dir: -1 }, // t4
  { freq1: 0.85, freq2: 1.75, amp1:  7, amp2: 3,  phase: 2.10, baseSpread:  1,  dir:  1 }, // t5
  { freq1: 1.20, freq2: 2.50, amp1: 10, amp2: 4,  phase: 1.40, baseSpread:  2,  dir:  1 }, // t6
  { freq1: 0.90, freq2: 1.95, amp1: 14, amp2: 5,  phase: 0.70, baseSpread:  4,  dir:  1 }, // t7
  { freq1: 1.05, freq2: 2.15, amp1: 18, amp2: 7,  phase: 0.10, baseSpread:  7,  dir:  1 }, // t8
]

export default function InteractiveRocket() {
  const rocketRef         = useRef(null)
  const loopRef           = useRef(null)
  const hoveringTextRef   = useRef(false)
  const cycleRef          = useRef(0)
  const lastTimeRef       = useRef(performance.now() * 0.0018)
  const smoothProgressRef = useRef(0)
  const avoidXRef         = useRef(0)
  const avoidYRef         = useRef(0)
  const targetAvoidXRef   = useRef(0)
  const targetAvoidYRef   = useRef(0)
  const mousePosRef       = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const rocket = rocketRef.current
    const loop   = loopRef.current
    if (!rocket || !loop) return

    let animId
    const tentacles = TENTACLE_DNA.map((_, i) => loop.querySelector(`#t${i + 1}`))
    const leftEye   = loop.querySelector('#left-eye-group')
    const rightEye  = loop.querySelector('#right-eye-group')
    const pingRing  = loop.querySelector('#ping-ring')

    const updateLoop = () => {
      const now = performance.now() * 0.0018
      const dt  = now - lastTimeRef.current
      lastTimeRef.current = now

      // ── Scroll progress ──────────────────────────────────────
      const scrollY   = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      const tp        = Math.min(1, Math.max(0, scrollY / maxScroll))
      smoothProgressRef.current += (tp - smoothProgressRef.current) * 0.05
      const progress = smoothProgressRef.current

      // ── Responsive scale ─────────────────────────────────────
      const winW    = window.innerWidth
      const winH    = window.innerHeight
      const isLg    = winW >= 1280
      const isMd    = winW >= 1024 && winW < 1280
      let sStart = 2.8, sEnd = 1.6
      if (isMd)       { sStart = 2.2; sEnd = 1.3 }
      else if (!isLg) { sStart = 1.5; sEnd = 0.9 }
      const sEase = 1 - Math.pow(1 - Math.min(1, progress / 0.18), 2.5)
      const scale = sStart + (sEnd - sStart) * sEase

      // ── Path ─────────────────────────────────────────────────
      let xOff = winW * 0.35
      let yOff = 0
      if (progress < 0.15)       yOff = 190 * (1 - progress / 0.15)
      else if (progress > 0.85)  xOff = winW * 0.35 * (1 - (progress - 0.85) / 0.15)

      const baseX = Math.sin(progress * Math.PI * 3.5) * (winW * 0.05) + xOff
      const baseY = Math.sin(progress * Math.PI * 2)   * (winH * 0.3)  + (winH * 0.05) + yOff

      // ── Mouse flee ───────────────────────────────────────────
      const octX  = winW / 2 + baseX + avoidXRef.current
      const octY  = winH / 2 + baseY + avoidYRef.current
      const dx    = octX - mousePosRef.current.x
      const dy    = octY - mousePosRef.current.y
      const dist  = Math.sqrt(dx * dx + dy * dy)
      const scare = 220 * (isLg ? 1.5 : 1)
      if (dist < scare && dist > 0) {
        const push = Math.pow((scare - dist) / scare, 1.5) * 350
        targetAvoidXRef.current = (dx / dist) * push
        targetAvoidYRef.current = (dy / dist) * push
      } else {
        targetAvoidXRef.current = 0
        targetAvoidYRef.current = 0
      }
      avoidXRef.current += (targetAvoidXRef.current - avoidXRef.current) * 0.08
      avoidYRef.current += (targetAvoidYRef.current - avoidYRef.current) * 0.08

      const pathX = baseX + avoidXRef.current
      const pathY = baseY + avoidYRef.current
      gsap.set(rocket, {
        x:        pathX,
        y:        pathY,
        opacity:  1,
        scale,
        rotation: Math.sin(progress * Math.PI * 3.5) * 12 + targetAvoidXRef.current * 0.05,
      })

      // ── Body breathing ───────────────────────────────────────
      const isHovering = hoveringTextRef.current
      const breathFreq = 1.2
      const bodyPulse  = Math.sin(now * breathFreq)
      gsap.set(loop, {
        y:        bodyPulse * 3.5,
        scaleY:   1 - bodyPulse * 0.018,
        scaleX:   1 + bodyPulse * 0.009,
        rotation: Math.sin(now * 0.6) * 2.0,
      })

      // ── NATURAL TENTACLE ANIMATION ────────────────────────────
      // Each tentacle uses two overlapping sine waves at different
      // frequencies (like real muscle groups) plus a tiny high-freq
      // tremor for liveness. The outer pair swings much wider than
      // the inner pair, matching real cephalopod biomechanics.
      tentacles.forEach((t, i) => {
        if (!t) return
        const dna = TENTACLE_DNA[i]
        const speedMul = isHovering ? 1.5 : 1.0

        // Primary slow wave (like the main propulsion stroke)
        const w1 = Math.sin(now * dna.freq1 * speedMul + dna.phase)
        // Secondary faster wave (like the curl / uncurl)
        const w2 = Math.sin(now * dna.freq2 * speedMul + dna.phase * 1.7)
        // Micro-tremor (organic texture, very subtle)
        const w3 = Math.sin(now * 4.5 + dna.phase * 3.1) * 0.18

        const angle = dna.baseSpread
          + dna.dir * (w1 * dna.amp1 + w2 * dna.amp2 + w3 * dna.amp1 * 0.12)

        t.style.transform = `rotate(${angle}deg)`
      })

      // ── Blink ────────────────────────────────────────────────
      if (leftEye && rightEye) {
        const bc    = (now * 0.5) % 4.2
        const scaleY = bc > 4.0 ? 0.04 : 1.0
        leftEye.style.transform  = `scaleY(${scaleY})`
        rightEye.style.transform = `scaleY(${scaleY})`
      }

      // ── Ping ring ────────────────────────────────────────────
      if (pingRing) {
        pingRing.className = isHovering
          ? 'absolute inset-0 border rounded-full animate-ping border-violet-400/60 opacity-50'
          : 'absolute inset-0 border rounded-full animate-ping border-slate-600/25 opacity-15'
      }

      window.__stickmanPos = {
        x:       winW / 2 + pathX,
        y:       winH / 2 + pathY + scrollY + bodyPulse * 3.5,
        opacity: 1,
      }

      animId = requestAnimationFrame(updateLoop)
    }

    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY }
      let target = e.target, isText = false
      while (target && target !== document.body) {
        const tags = ['H1','H2','H3','H4','H5','H6','P','SPAN','A','BUTTON','LI','STRONG','EM','LABEL','INPUT','TEXTAREA']
        if (
          tags.includes(target.tagName) ||
          ['btn-primary','btn-ghost','glass','group','text-gradient'].some(c => target.classList.contains(c))
        ) { isText = true; break }
        target = target.parentElement
      }
      hoveringTextRef.current = isText
    }

    animId = requestAnimationFrame(updateLoop)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.__stickmanPos = null
    }
  }, [])

  return (
    <div
      ref={rocketRef}
      className="fixed hidden lg:block left-1/2 top-1/2 -ml-[60px] -mt-[65px] z-0 pointer-events-none select-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <div
        ref={loopRef}
        className="relative flex flex-col items-center justify-center"
        style={{ transformOrigin: 'center 43px', willChange: 'transform' }}
      >
        <svg
          width="120"
          height="130"
          viewBox="0 0 120 130"
          fill="none"
          className="overflow-visible"
          style={{ filter: 'drop-shadow(0 6px 20px rgba(15,23,42,0.40))' }}
        >
          <defs>
            {/* Head gradient — dark slate, professional */}
            <linearGradient id="oct-head-grad" x1="60" y1="21" x2="60" y2="61" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#64748B" />
              <stop offset="42%"  stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            {/* Head specular */}
            <radialGradient id="oct-head-shine" cx="34%" cy="22%" r="38%">
              <stop offset="0%"   stopColor="#CBD5E1" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0"    />
            </radialGradient>
            {/* Tentacle gradient */}
            <linearGradient id="oct-limb-grad" x1="60" y1="57" x2="60" y2="111" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#475569" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* ── EYE GRADIENTS — brand purple palette ── */}
            {/* Outer iris: bright violet to deep purple */}
            <radialGradient id="eye-iris-grad" cx="38%" cy="30%" r="65%">
              <stop offset="0%"   stopColor="#DDD6FE" />   {/* violet-200 highlight */}
              <stop offset="28%"  stopColor="#A78BFA" />   {/* violet-400 */}
              <stop offset="65%"  stopColor="#7C3AED" />   {/* violet-600 brand */}
              <stop offset="100%" stopColor="#4C1D95" />   {/* violet-900 rim */}
            </radialGradient>
            {/* Pupil */}
            <radialGradient id="eye-pupil-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#0F0B2A" />
              <stop offset="100%" stopColor="#020617" />
            </radialGradient>
            {/* Subtle outer glow ring behind each eye */}
            <radialGradient id="eye-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#7C3AED" stopOpacity="0"    />
            </radialGradient>
          </defs>

          {/* ════════════════════════════════════════════ */}
          {/* 8 TENTACLES — unique transform origins      */}
          {/* ════════════════════════════════════════════ */}

          <g id="t1" style={{ transformOrigin: '51px 57px', transition: 'transform 0.08s ease-out' }}>
            <path d="M51 57 C39 63 31 71 33 91 C34 97 29 103 33 105"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t2" style={{ transformOrigin: '53px 59px', transition: 'transform 0.08s ease-out' }}>
            <path d="M53 59 C43 67 37 77 41 97 C42 101 37 106 42 107"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t3" style={{ transformOrigin: '55px 60px', transition: 'transform 0.08s ease-out' }}>
            <path d="M55 60 C49 69 45 83 49 101 C50 105 47 109 51 110"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t4" style={{ transformOrigin: '57px 61px', transition: 'transform 0.08s ease-out' }}>
            <path d="M57 61 C53 71 53 87 57 103 C58 107 55 110 59 111"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t5" style={{ transformOrigin: '63px 61px', transition: 'transform 0.08s ease-out' }}>
            <path d="M63 61 C67 71 67 87 63 103 C62 107 65 110 61 111"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t6" style={{ transformOrigin: '65px 60px', transition: 'transform 0.08s ease-out' }}>
            <path d="M65 60 C71 69 75 83 71 101 C70 105 73 109 69 110"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t7" style={{ transformOrigin: '67px 59px', transition: 'transform 0.08s ease-out' }}>
            <path d="M67 59 C77 67 83 77 79 97 C78 101 83 106 78 107"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>
          <g id="t8" style={{ transformOrigin: '69px 57px', transition: 'transform 0.08s ease-out' }}>
            <path d="M69 57 C81 63 89 71 87 91 C86 97 91 103 87 105"
              stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* ════════════════════════════════════════════ */}
          {/* HEAD                                        */}
          {/* ════════════════════════════════════════════ */}
          <path
            d="M60 21 C45 21 36 30 36 43 C36 53 42 59 51 61 C54 61.5 66 61.5 69 61 C78 59 84 53 84 43 C84 30 75 21 60 21 Z"
            fill="url(#oct-head-grad)"
          />
          {/* Specular overlay */}
          <path
            d="M60 21 C45 21 36 30 36 43 C36 53 42 59 51 61 C54 61.5 66 61.5 69 61 C78 59 84 53 84 43 C84 30 75 21 60 21 Z"
            fill="url(#oct-head-shine)"
          />
          {/* Left body sheen */}
          <path
            d="M41 35 C39 39 39 43 41 47 C42 49 44 50 46 50 C43 47 42 43 43 39 C44 36 46 33 48 31 C44 31 42 33 41 35 Z"
            fill="#FFFFFF" opacity="0.09"
          />

          {/* ════════════════════════════════════════════ */}
          {/* EYES — brand purple, serious & clean        */}
          {/* ════════════════════════════════════════════ */}

          {/* LEFT EYE */}
          <g id="left-eye-group" style={{ transformOrigin: '49px 43px', transition: 'transform 0.08s ease-out' }}>
            {/* Outer glow halo */}
            <ellipse cx="49" cy="43" rx="9.5" ry="8"   fill="url(#eye-glow)" />
            {/* Dark socket for depth */}
            <ellipse cx="49" cy="43" rx="8.2" ry="6.8" fill="#0F0B2A" opacity="0.65" />
            {/* Iris — brand violet gradient */}
            <ellipse cx="49" cy="43" rx="7"   ry="5.8" fill="url(#eye-iris-grad)" />
            {/* Pupil */}
            <ellipse cx="49" cy="43" rx="3.8" ry="3.2" fill="url(#eye-pupil-grad)" />
            {/* Primary specular catch-light */}
            <circle  cx="51.2" cy="41"   r="1.4" fill="#FFFFFF" opacity="0.90" />
            {/* Micro secondary glint */}
            <circle  cx="47.5" cy="45.2" r="0.6" fill="#FFFFFF" opacity="0.40" />
          </g>

          {/* RIGHT EYE */}
          <g id="right-eye-group" style={{ transformOrigin: '71px 43px', transition: 'transform 0.08s ease-out' }}>
            {/* Outer glow halo */}
            <ellipse cx="71" cy="43" rx="9.5" ry="8"   fill="url(#eye-glow)" />
            {/* Dark socket */}
            <ellipse cx="71" cy="43" rx="8.2" ry="6.8" fill="#0F0B2A" opacity="0.65" />
            {/* Iris */}
            <ellipse cx="71" cy="43" rx="7"   ry="5.8" fill="url(#eye-iris-grad)" />
            {/* Pupil */}
            <ellipse cx="71" cy="43" rx="3.8" ry="3.2" fill="url(#eye-pupil-grad)" />
            {/* Specular */}
            <circle  cx="73.2" cy="41"   r="1.4" fill="#FFFFFF" opacity="0.90" />
            <circle  cx="69.5" cy="45.2" r="0.6" fill="#FFFFFF" opacity="0.40" />
          </g>

        </svg>

        {/* Ambient ring — subtle purple on hover */}
        <div className="absolute top-[43px] left-[60px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none">
          <div
            id="ping-ring"
            className="absolute inset-0 border rounded-full animate-ping border-slate-600/25 opacity-15"
            style={{ animationDuration: '5s' }}
          />
        </div>
      </div>
    </div>
  )
}
