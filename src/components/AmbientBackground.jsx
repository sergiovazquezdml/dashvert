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
    const interactionRadius = 130
    const returnSpeed = 0.08

    const mouse = { x: -9999, y: -9999 }

    const colors = [
      'rgba(79, 70, 229, 0.3)',
      'rgba(124, 58, 237, 0.26)',
      'rgba(16, 185, 129, 0.24)',
      'rgba(99, 102, 241, 0.2)',
    ]

    function buildGrid() {
      width = canvas.width = window.innerWidth
      height = canvas.height = document.documentElement.scrollHeight
      canvas.style.height = height + 'px'
      points = []
      const cols = Math.ceil(width / spacing) + 1
      const rows = Math.ceil(height / spacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const defaultColor = colors[(row + col) % colors.length]
          points.push({
            homeX: col * spacing,
            homeY: row * spacing,
            x: col * spacing,
            y: row * spacing,
            baseSize: 1.8,
            size: 1.8,
            baseColor: defaultColor,
            color: defaultColor,
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

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // Recalculate canvas height periodically (content can change)
    const heightCheck = setInterval(() => {
      const newH = document.documentElement.scrollHeight
      if (Math.abs(newH - height) > 50) buildGrid()
    }, 2000)

    function applyAttractor(p, ax, ay, radius, strength) {
      const dx = ax - p.homeX
      const dy = ay - p.homeY
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < radius && dist > 0) {
        const force = (radius - dist) / radius
        const pull = force * force * strength
        p.x += (dx / dist) * pull
        p.y += (dy / dist) * pull
        p.size = Math.max(p.size, p.baseSize + force * 3.5)
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Time variable for continuous drift
      const time = performance.now() * 0.0006

      // Stickman (Octopus) position from global
      const sm = window.__stickmanPos || null

      for (let i = 0; i < points.length; i++) {
        const p = points[i]
        
        // Mobile drift logic: organic continuous movement
        const driftX = Math.sin(time + p.homeX * 0.02 + p.homeY * 0.02) * 12
        const driftY = Math.cos(time + p.homeX * 0.02 - p.homeY * 0.02) * 12
        
        // Base positions with drift
        p.x = p.homeX + driftX
        p.y = p.homeY + driftY
        p.size = p.baseSize
        p.color = p.baseColor

        // Mouse attractor (pulling drifted positions)
        applyAttractor(p, mouse.x, mouse.y, interactionRadius, 22)

        // Stickman (Octopus) glow reaction (without clumping points)
        if (sm && sm.opacity > 0.01) {
          const smOpacity = sm.opacity !== undefined ? sm.opacity : 1.0
          
          const dx = sm.x - p.homeX
          const dy = sm.y - p.homeY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 240) {
            const ratio = (240 - dist) / 240
            p.size = p.baseSize + ratio * 3.5 * smOpacity
            
            const purpleAlpha = 0.22 + ratio * 0.4
            if (smOpacity > 0.05) {
              p.color = `rgba(168, 85, 247, ${Math.max(0.2, purpleAlpha * smOpacity)})`
            } else {
              p.color = p.baseColor
            }
          }
        }

        // Smooth physics interpolation (LERP)
        const tx = p.x
        const ty = p.y
        p.x = p.homeX + driftX + (tx - (p.homeX + driftX)) * 0.6
        p.y = p.homeY + driftY + (ty - (p.homeY + driftY)) * 0.6

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
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
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none bg-slate-950">
      <canvas ref={canvasRef} className="absolute top-0 left-0 block" />
    </div>
  )
}
