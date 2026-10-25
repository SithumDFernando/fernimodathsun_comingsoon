import { useEffect, useRef } from 'react'

export default function BackgroundParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    // Palette: black, yellow, orange glowing embers
    const colors = [
      'rgba(255, 230, 100, ', // bright yellow
      'rgba(255, 180, 20, ',  // golden amber
      'rgba(255, 120, 0, ',   // bright orange
      'rgba(255, 70, 0, ',    // fiery orange
      'rgba(255, 200, 50, ',  // warm gold
    ]

    const particleCount = Math.min(85, Math.floor((width * height) / 14000))
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.6,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: -(Math.random() * 0.7 + 0.2),
        speedX: (Math.random() - 0.5) * 0.4,
        colorPrefix: colors[Math.floor(Math.random() * colors.length)],
        oscillationSpeed: Math.random() * 0.02 + 0.005,
        oscillationAngle: Math.random() * Math.PI * 2,
        oscillationRadius: Math.random() * 1.5 + 0.5,
      })
    }

    let mouseX = width / 2
    let mouseY = height / 2
    let mouseActive = false

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      mouseActive = true
    }

    const handleMouseLeave = () => {
      mouseActive = false
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Ambient subtle mouse glow
      if (mouseActive) {
        const mouseGlow = ctx.createRadialGradient(
          mouseX,
          mouseY,
          0,
          mouseX,
          mouseY,
          260
        )
        mouseGlow.addColorStop(0, 'rgba(255, 140, 0, 0.045)')
        mouseGlow.addColorStop(0.5, 'rgba(255, 100, 0, 0.02)')
        mouseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = mouseGlow
        ctx.fillRect(0, 0, width, height)
      }

      // Draw embers
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.oscillationAngle += p.oscillationSpeed
        p.y += p.speedY
        p.x += p.speedX + Math.sin(p.oscillationAngle) * (p.oscillationRadius * 0.1)

        // Mouse gentle repel
        if (mouseActive) {
          const dx = p.x - mouseX
          const dy = p.y - mouseY
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120 && dist > 0) {
            const force = (120 - dist) / 120
            p.x += (dx / dist) * force * 1.5
            p.y += (dy / dist) * force * 1.5
          }
        }

        // Reset if moved off top or sides
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        // Subtle alpha breathing
        const currentAlpha =
          p.baseAlpha * (0.7 + 0.3 * Math.sin(p.oscillationAngle * 2))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `${p.colorPrefix}${currentAlpha})`
        ctx.shadowColor = 'rgba(255, 150, 0, 0.7)'
        ctx.shadowBlur = p.size * 5
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="particles-canvas"
      aria-hidden="true"
    />
  )
}
