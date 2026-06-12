import React, { useEffect, useRef } from 'react'

export default function AmbientBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width, height
    let points = []
    const spacing = 38
    const interactionRadius = 155

    const mouse = { x: -9999, y: -9999 }

    const lightColors = [
      { r: 79, g: 70, b: 229, baseA: 0.22 },
      { r: 124, g: 58, b: 237, baseA: 0.18 },
      { r: 16, g: 185, b: 129, baseA: 0.18 },
      { r: 99, g: 102, b: 241, baseA: 0.16 }
    ]

    const darkColors = [
      { r: 129, g: 140, b: 248, baseA: 0.38 },
      { r: 167, g: 139, b: 250, baseA: 0.34 },
      { r: 52, g: 211, b: 153, baseA: 0.34 },
      { r: 165, g: 180, b: 252, baseA: 0.30 }
    ]

    let targetTheme = 0
    let currentTheme = 0

    function buildGrid() {
      width = canvas.width = window.innerWidth
      height = canvas.height = document.documentElement.scrollHeight
      canvas.style.height = height + 'px'
      points = []
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const colorIndex = (row + col) % lightColors.length
          points.push({
            homeX: col * spacing,
            homeY: row * spacing,
            x: col * spacing,
            y: row * spacing,
            vx: 0,
            vy: 0,
            baseSize: 1.8,
            size: 1.8,
            sizeTarget: 1.8,
            alpha: 0,
            alphaTarget: 0,
            colorIndex: colorIndex,
            color: '',
          })
        }
      }
    }

    buildGrid()

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY + window.scrollY
    }
    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    let resizeTimer
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(buildGrid, 200)
    }

    const updateTheme = () => {
      let isDark = false
      const y = window.scrollY + window.innerHeight * 0.5
      const darkSections = document.querySelectorAll('[data-theme="dark"]')
      
      darkSections.forEach(sec => {
        const rect = sec.getBoundingClientRect()
        const top = rect.top + window.scrollY
        const bottom = rect.bottom + window.scrollY
        if (y >= top - 100 && y <= bottom + 100) {
          isDark = true
        }
      })
      targetTheme = isDark ? 1 : 0
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', updateTheme)

    // Initial check
    setTimeout(updateTheme, 100)

    // Recalculate canvas height periodically
    const heightCheck = setInterval(() => {
      const newH = document.documentElement.scrollHeight
      if (Math.abs(newH - height) > 50) {
        buildGrid()
        updateTheme()
      }
    }, 2000)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth theme transition (12% LERP interpolation per frame — 3.5x faster)
      currentTheme += (targetTheme - currentTheme) * 0.12

      // Interpolate wrapper background
      const bgR = Math.round(255 + (11 - 255) * currentTheme)
      const bgG = Math.round(255 + (15 - 255) * currentTheme)
      const bgB = Math.round(255 + (25 - 255) * currentTheme)
      if (containerRef.current) {
        containerRef.current.style.backgroundColor = `rgb(${bgR}, ${bgG}, ${bgB})`
      }

      // Wave physics time variable (speed of the waves)
      const time = performance.now() * 0.0015

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        
        // Diagonal wave propagation coordinates displacement
        const waveAngle = time + (p.homeX * 0.007) + (p.homeY * 0.007)
        const waveX = Math.sin(waveAngle) * 11
        const waveY = Math.cos(waveAngle) * 11

        // Size wave modulation (creates a 3D depth ripple effect)
        const sizeWave = Math.sin(time * 1.3 + (p.homeX * 0.005) + (p.homeY * 0.007))
        p.baseSize = 1.4 + (sizeWave + 1.0) * 0.9 // oscillates between 1.4px and 3.2px

        const targetX = p.homeX + waveX
        const targetY = p.homeY + waveY

        // Hooke's Law spring back towards home target
        const dx = targetX - p.x
        const dy = targetY - p.y
        p.vx += dx * 0.045
        p.vy += dy * 0.045

        // Mouse repulsion and glow halos
        if (mouse.x !== -9999) {
          const mdx = p.x - mouse.x
          const mdy = p.y - mouse.y
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy)
          if (mdist < interactionRadius && mdist > 0) {
            const force = (interactionRadius - mdist) / interactionRadius
            const push = force * force * 1.55 // push force
            
            // Add push velocity (away from mouse)
            p.vx += (mdx / mdist) * push
            p.vy += (mdy / mdist) * push

            // Set hover sizes & brightness offsets
            p.sizeTarget = p.baseSize + force * 2.8
            p.alphaTarget = force * 0.65
          } else {
            p.sizeTarget = p.baseSize
            p.alphaTarget = 0
          }
        } else {
          p.sizeTarget = p.baseSize
          p.alphaTarget = 0
        }

        // Apply friction damping
        p.vx *= 0.82
        p.vy *= 0.82

        // Move particle
        p.x += p.vx
        p.y += p.vy

        // Interpolate visual attributes
        p.size += (p.sizeTarget - p.size) * 0.15
        p.alpha += (p.alphaTarget - p.alpha) * 0.1

        // Color interpolation
        const lc = lightColors[p.colorIndex]
        const dc = darkColors[p.colorIndex]
        const r = Math.round(lc.r + (dc.r - lc.r) * currentTheme)
        const g = Math.round(lc.g + (dc.g - lc.g) * currentTheme)
        const b = Math.round(lc.b + (dc.b - lc.b) * currentTheme)
        const baseA = lc.baseA + (dc.baseA - lc.baseA) * currentTheme
        
        const finalA = Math.min(1.0, baseA + p.alpha)
        
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalA})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearInterval(heightCheck)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', updateTheme)
    }
  }, [])

  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-white">
      <canvas ref={canvasRef} className="absolute top-0 left-0 block" />
    </div>
  )
}
