import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InteractiveRocket() {
  const rocketRef = useRef(null)
  const loopRef = useRef(null)
  const hoveringTextRef = useRef(false)
  const currentOpacityRef = useRef(1.0)
  
  // Accumulators and LERP refs for fluid movement
  const cycleRef = useRef(0)
  const lastTimeRef = useRef(performance.now() * 0.0018)
  const smoothProgressRef = useRef(0)
  const avoidXRef = useRef(0)
  const avoidYRef = useRef(0)
  const targetAvoidXRef = useRef(0)
  const targetAvoidYRef = useRef(0)
  const mousePosRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const rocket = rocketRef.current
    const loop = loopRef.current
    if (!rocket || !loop) return

    let animId
    const tentacles = [
      loop.querySelector('#t1'),
      loop.querySelector('#t2'),
      loop.querySelector('#t3'),
      loop.querySelector('#t4'),
      loop.querySelector('#t5'),
      loop.querySelector('#t6'),
      loop.querySelector('#t7'),
      loop.querySelector('#t8'),
    ]

    const leftEyeGroup = loop.querySelector('#left-eye-group')
    const rightEyeGroup = loop.querySelector('#right-eye-group')
    const pingRing = loop.querySelector('#ping-ring')

    // ----------------------------------------------------
    // LIFELIKE JET-PROPULSION SWIM & REACTION LOOP
    // ----------------------------------------------------
    const updateLoop = () => {
      const currentTime = performance.now() * 0.0018
      const dt = currentTime - lastTimeRef.current
      lastTimeRef.current = currentTime

      // A. Smooth Scroll Progress (LERP to eliminate jitter)
      const scrollY = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight || 1
      const targetProgress = Math.min(1, Math.max(0, scrollY / maxScroll))
      
      // LERP factor 0.05 makes the scroll tracking ultra-fluid
      smoothProgressRef.current += (targetProgress - smoothProgressRef.current) * 0.05
      const progress = smoothProgressRef.current

      // B. Real-Time Dynamic Scale Calculation
      const winW = window.innerWidth
      const winH = window.innerHeight
      const curLarge = winW >= 1280
      const curMedium = winW >= 1024 && winW < 1280

      let startScale = 2.8
      let endScale = 1.6
      if (curMedium) {
        startScale = 2.2
        endScale = 1.3
      } else if (!curLarge && !curMedium) {
        startScale = 1.5
        endScale = 0.9
      }

      const scaleProgress = Math.min(1.0, progress / 0.18)
      const scaleEase = 1 - Math.pow(1 - scaleProgress, 2.5)
      const dynamicScale = startScale + (endScale - startScale) * scaleEase
      
      // C. Fleeing Behavior (Avoid Mouse)
      // Ruta dinámica inteligente del pulpo:
      let xOffset = winW * 0.35 // Por defecto: carril derecho (para no tapar texto)
      
      if (progress < 0.15) {
        // Inicio (Hero): Más a la izquierda (aprox 7cm) cerca del título
        const heroRatio = progress / 0.15
        const startX = winW * 0.15
        xOffset = startX + (winW * 0.35 - startX) * heroRatio
      } else if (progress > 0.85) {
        // Final (Footer): Se mueve al centro exacto
        const footerRatio = (progress - 0.85) / 0.15
        xOffset = winW * 0.35 * (1 - footerRatio)
      }
      
      const baseX = Math.sin(progress * Math.PI * 3.5) * (winW * 0.05) + xOffset
      const baseY = Math.sin(progress * Math.PI * 2) * (winH * 0.3) + (winH * 0.05)
      
      const octX = winW / 2 + baseX + avoidXRef.current
      const octY = winH / 2 + baseY + avoidYRef.current
      
      const dx = octX - mousePosRef.current.x
      const dy = octY - mousePosRef.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      const scareRadius = 220 * (curLarge ? 1.5 : 1)
      
      if (distance < scareRadius && distance > 0) {
        // Push away from cursor smoothly
        const pushFactor = Math.pow((scareRadius - distance) / scareRadius, 1.5)
        const pushDist = pushFactor * 350
        targetAvoidXRef.current = (dx / distance) * pushDist
        targetAvoidYRef.current = (dy / distance) * pushDist
      } else {
        // Slowly return to base path
        targetAvoidXRef.current = 0
        targetAvoidYRef.current = 0
      }
      
      // LERP avoidance vectors for organic evasion
      avoidXRef.current += (targetAvoidXRef.current - avoidXRef.current) * 0.08
      avoidYRef.current += (targetAvoidYRef.current - avoidYRef.current) * 0.08
      
      const pathX = baseX + avoidXRef.current
      const pathY = baseY + avoidYRef.current
      const rotationAngle = Math.sin(progress * Math.PI * 3.5) * 12 + (targetAvoidXRef.current * 0.05)
      
      gsap.set(rocket, { 
        x: pathX,
        y: pathY,
        opacity: 1, // Keep fully visible, never disappear
        scale: dynamicScale,
        rotation: rotationAngle
      })

      // C. Master Swim Pulse (Gentle, Natural Breathing & Swimming)
      const isHovering = hoveringTextRef.current
      // Natural fluid breathing: gentle acceleration and deceleration
      const ambientSwim = 1.0 + Math.sin(currentTime * 1.5) * 0.6
      const targetSwimSpeed = isHovering ? 2.5 : ambientSwim
      cycleRef.current += dt * targetSwimSpeed
      
      const cycle = cycleRef.current % (Math.PI * 2)
      const swimPulse = Math.sin(cycle)
      
      // Squash & Stretch Body Physics - smooth breathing motion
      const bodyBounceY = swimPulse * 4.0
      const bodyScaleY = 1 - (swimPulse * 0.02)
      const bodyScaleX = 1 + (swimPulse * 0.01)
      
      gsap.set(loop, { 
        y: bodyBounceY, 
        scaleY: bodyScaleY,
        scaleX: bodyScaleX,
        rotation: Math.sin(currentTime * 0.7) * 2.5 // very gentle ambient sway
      })

      // D. Organic Symmetrical Tentacles
      tentacles.forEach((t, index) => {
        if (!t) return
        
        const distFromCenter = Math.abs(3.5 - index)
        // Complex wave for natural trailing and wriggling
        const phaseOffset = distFromCenter * 0.35 + index * 0.1
        const organicWave = Math.sin(cycle - phaseOffset) * 0.85 + Math.cos(currentTime * 1.5 + index) * 0.2
        
        const isLeft = index < 4
        const directionMultiplier = isLeft ? -1 : 1
        
        const baseSweep = (distFromCenter + 1.0) * 4.5
        const speedMultiplier = isHovering ? 1.4 : 1.0
        
        // Base spread so tentacles don't perfectly overlap when resting
        const baselineSpread = (distFromCenter * 2.0) * directionMultiplier
        
        const angle = baselineSpread + (directionMultiplier * organicWave * baseSweep * speedMultiplier)

        t.style.transform = `rotate(${angle}deg)`
      })

      // E. Direct DOM updates for Blinking
      if (leftEyeGroup && rightEyeGroup) {
        const timeInSec = currentTime * 0.55
        const blinkCycle = timeInSec % 4.0
        const isBlinking = blinkCycle > 3.82
        
        const targetScaleY = isBlinking ? 0.05 : 1.0
        leftEyeGroup.style.transform = `scaleY(${targetScaleY})`
        rightEyeGroup.style.transform = `scaleY(${targetScaleY})`
      }

      if (pingRing) {
        if (isHovering) {
          pingRing.className = 'absolute inset-0 border rounded-full animate-ping border-purple-400 opacity-60'
        } else {
          pingRing.className = 'absolute inset-0 border rounded-full animate-ping border-purple-500/25 opacity-20'
        }
      }

      // F. Mathematical Particle Tracking Position
      const cx = winW / 2 + pathX
      const cy = winH / 2 + pathY + scrollY + bodyBounceY

      window.__stickmanPos = { 
        x: cx, 
        y: cy,
        opacity: 1
      }

      animId = requestAnimationFrame(updateLoop)
    }

    // --- MOUSE DETECTION ---
    const handleMouseMove = (e) => {
      // Store raw mouse position for the updateLoop to use
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY
      }

      // Hovering text detection (efficiently checks target under mouse)
      let target = e.target
      let isText = false

      while (target && target !== document.body) {
        const textTags = [
          'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 
          'P', 'SPAN', 'A', 'BUTTON', 'LI', 
          'STRONG', 'EM', 'LABEL', 'INPUT', 'TEXTAREA'
        ]
        const hasTextClass = 
          target.classList.contains('btn-primary') || 
          target.classList.contains('btn-ghost') || 
          target.classList.contains('glass') || 
          target.classList.contains('group') ||
          target.classList.contains('text-gradient')

        if (textTags.includes(target.tagName) || hasTextClass) {
          isText = true
          break
        }
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
      className="fixed hidden lg:block left-1/2 top-1/2 -ml-[60px] -mt-[65px] z-0 pointer-events-none select-none transition-opacity duration-300"
      style={{ willChange: 'transform, opacity' }}
    >
      {/* Octopus main wrapper */}
      <div
        ref={loopRef}
        className="relative flex flex-col items-center justify-center"
        style={{ transformOrigin: 'center 43px', willChange: 'transform' }}
      >
        
        {/* Expanded SVG container 120x130 */}
        <svg width="120" height="130" viewBox="0 0 120 130" fill="none" className="filter drop-shadow-[0_8px_24px_rgba(30,41,59,0.18)] overflow-visible">
          
          {/* -------------------------------------------------- */}
          {/* 8 CLEAN TENTACLES (Symmetric Swim Stroke) */}
          {/* -------------------------------------------------- */}
          
          <g id="t1" style={{ transformOrigin: '51px 57px', transition: 'transform 0.1s ease-out' }}>
            <path d="M51 57 C39 63 31 71 33 91 C34 97 29 103 33 105" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t2" style={{ transformOrigin: '53px 59px', transition: 'transform 0.1s ease-out' }}>
            <path d="M53 59 C43 67 37 77 41 97 C42 101 37 106 42 107" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t3" style={{ transformOrigin: '55px 60px', transition: 'transform 0.1s ease-out' }}>
            <path d="M55 60 C49 69 45 83 49 101 C50 105 47 109 51 110" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t4" style={{ transformOrigin: '57px 61px', transition: 'transform 0.1s ease-out' }}>
            <path d="M57 61 C53 71 53 87 57 103 C58 107 55 110 59 111" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t5" style={{ transformOrigin: '63px 61px', transition: 'transform 0.1s ease-out' }}>
            <path d="M63 61 C67 71 67 87 63 103 C62 107 65 110 61 111" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t6" style={{ transformOrigin: '65px 60px', transition: 'transform 0.1s ease-out' }}>
            <path d="M65 60 C71 69 75 83 71 101 C70 105 73 109 69 110" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t7" style={{ transformOrigin: '67px 59px', transition: 'transform 0.1s ease-out' }}>
            <path d="M67 59 C77 67 83 77 79 97 C78 101 83 106 78 107" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          <g id="t8" style={{ transformOrigin: '69px 57px', transition: 'transform 0.1s ease-out' }}>
            <path d="M69 57 C81 63 89 71 87 91 C86 97 91 103 87 105" stroke="url(#oct-limb-grad)" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
          </g>

          {/* -------------------------------------------------- */}
          {/* SERIOUS & REALISTIC HEAD */}
          {/* -------------------------------------------------- */}
          <path
            d="M60 21 C45 21 36 30 36 43 C36 53 42 59 51 61 C54 61.5 66 61.5 69 61 C78 59 84 53 84 43 C84 30 75 21 60 21 Z"
            fill="url(#oct-head-grad)"
          />
          <path
            d="M41 35 C39 39 39 43 41 47 C42 49 44 50 46 50 C43 47 42 43 43 39 C44 36 46 33 48 31 C44 31 42 33 41 35 Z"
            fill="#FFFFFF"
            opacity="0.15"
          />

          {/* -------------------------------------------------- */}
          {/* SERIOUS INTELLIGENT GLOWING PURPLE EYES (With Blinking Group) */}
          {/* -------------------------------------------------- */}
          {/* Left Eye Group */}
          <g id="left-eye-group" style={{ transformOrigin: '49px 43px', transition: 'transform 0.08s ease-out' }}>
            <ellipse cx="49" cy="43" rx="7.5" ry="6" fill="url(#eye-grad-normal)" stroke="#1E293B" strokeWidth="0.8" />
            <ellipse cx="49" cy="43" rx="5.5" ry="1.6" fill="#0F172A" />
            <circle cx="51.5" cy="41" r="0.8" fill="#FFFFFF" />
          </g>

          {/* Right Eye Group */}
          <g id="right-eye-group" style={{ transformOrigin: '71px 43px', transition: 'transform 0.08s ease-out' }}>
            <ellipse cx="71" cy="43" rx="7.5" ry="6" fill="url(#eye-grad-normal)" stroke="#1E293B" strokeWidth="0.8" />
            <ellipse cx="71" cy="43" rx="5.5" ry="1.6" fill="#0F172A" />
            <circle cx="69.5" cy="41" r="0.8" fill="#FFFFFF" />
          </g>

          {/* -------------------------------------------------- */}
          {/* GRADIENTS & SHADERS */}
          {/* -------------------------------------------------- */}
          <defs>
            <linearGradient id="oct-head-grad" x1="60" y1="21" x2="60" y2="61" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="40%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1E293B" />
            </linearGradient>
            
            <linearGradient id="oct-limb-grad" x1="60" y1="57" x2="60" y2="111" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <radialGradient id="eye-grad-normal" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#C084FC" />
              <stop offset="70%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#6D28D9" />
            </radialGradient>
            <radialGradient id="eye-grad-hover" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#F472B6" />
              <stop offset="60%" stopColor="#D8B4FE" />
              <stop offset="100%" stopColor="#A855F7" />
            </radialGradient>
          </defs>
        </svg>

        {/* Ambient Floating Ring (Glowing purple/violet) */}
        <div className="absolute top-[43px] left-[60px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 pointer-events-none transition-opacity duration-300">
          <div 
            id="ping-ring"
            className="absolute inset-0 border rounded-full animate-ping border-purple-500/25 opacity-20"
            style={{ animationDuration: '4.5s', transition: 'border-color 0.3s, opacity 0.3s' }} 
          />
        </div>
      </div>
    </div>
  )
}


