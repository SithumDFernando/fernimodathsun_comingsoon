import { useState, useEffect, useRef } from 'react'
import './Scorpion.css'

export default function Scorpion() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isStriking, setIsStriking] = useState(false)
  const [ripples, setRipples] = useState([])
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window
      const nx = (e.clientX / innerWidth - 0.5) * 2
      const ny = (e.clientY / innerHeight - 0.5) * 2
      setMousePos({ x: nx, y: ny })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleTriggerStrike = (e) => {
    if (isStriking) return
    setIsStriking(true)

    const rect = containerRef.current?.getBoundingClientRect()
    const clickX = e ? e.clientX - (rect?.left || 0) : 210
    const clickY = e ? e.clientY - (rect?.top || 0) : 70

    const newRipple = {
      id: Date.now(),
      x: clickX,
      y: clickY,
    }
    setRipples((prev) => [...prev.slice(-3), newRipple])

    setTimeout(() => {
      setIsStriking(false)
    }, 700)

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id))
    }, 1200)
  }

  const tiltX = -mousePos.y * 11
  const tiltY = mousePos.x * 13

  return (
    <div
      ref={containerRef}
      className={`scorpion-wrapper ${isStriking ? 'striking' : ''}`}
      onClick={handleTriggerStrike}
      style={{
        transform: `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
      }}
      role="img"
      aria-label="Animated bio-mechanical scorpion with glowing amber stinger"
    >
      <div className="scorpion-ambient-glow" />

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="strike-shockwave"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}

      <svg
        className="scorpion-svg"
        viewBox="0 0 600 620"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Chitin shell gradients */}
          <linearGradient id="chitin-shell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2c251b" />
            <stop offset="40%" stopColor="#15120e" />
            <stop offset="85%" stopColor="#0a0907" />
            <stop offset="100%" stopColor="#040403" />
          </linearGradient>

          <linearGradient id="chitin-tail-seg" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3d2a10" />
            <stop offset="25%" stopColor="#1a140b" />
            <stop offset="50%" stopColor="#251b0f" />
            <stop offset="75%" stopColor="#1a140b" />
            <stop offset="100%" stopColor="#3d2a10" />
          </linearGradient>

          <linearGradient id="amber-core" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ff5400" />
            <stop offset="50%" stopColor="#ffb703" />
            <stop offset="100%" stopColor="#ffe600" />
          </linearGradient>

          <linearGradient id="stinger-plasma" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff3a00" />
            <stop offset="35%" stopColor="#ff9f1c" />
            <stop offset="80%" stopColor="#ffe600" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>

          <radialGradient id="telson-glow" cx="45%" cy="38%" r="58%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#ffe600" />
            <stop offset="65%" stopColor="#ff7b00" />
            <stop offset="90%" stopColor="#cc3300" />
            <stop offset="100%" stopColor="#220800" />
          </radialGradient>

          {/* Glow Filters */}
          <filter id="soft-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="hyper-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="8" result="blur1" />
            <feGaussianBlur stdDeviation="18" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ================= WALKING LEGS (4 PAIRS) ================= */}
        <g className="scorpion-legs">
          {/* Leg L1 */}
          <g className="leg leg-l1">
            <path
              d="M 245 285 Q 185 270 145 295 T 110 340 L 95 365"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 245 285 Q 185 270 145 295 T 110 340 L 95 365"
              fill="none"
              stroke="#ffb703"
              strokeWidth="1.2"
              strokeDasharray="14 10"
              opacity="0.85"
            />
            <circle cx="95" cy="365" r="2.2" fill="#ffe600" />
          </g>

          {/* Leg L2 */}
          <g className="leg leg-l2">
            <path
              d="M 245 318 Q 175 310 130 345 T 85 410 L 70 440"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M 245 318 Q 175 310 130 345 T 85 410 L 70 440"
              fill="none"
              stroke="#ff9f1c"
              strokeWidth="1.2"
              strokeDasharray="16 12"
              opacity="0.8"
            />
            <circle cx="70" cy="440" r="2.2" fill="#ffe600" />
          </g>

          {/* Leg L3 */}
          <g className="leg leg-l3">
            <path
              d="M 248 355 Q 168 360 120 410 T 75 485 L 60 520"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M 248 355 Q 168 360 120 410 T 75 485 L 60 520"
              fill="none"
              stroke="#ff8500"
              strokeWidth="1.2"
              strokeDasharray="18 14"
              opacity="0.75"
            />
            <circle cx="60" cy="520" r="2.4" fill="#ffe600" />
          </g>

          {/* Leg L4 */}
          <g className="leg leg-l4">
            <path
              d="M 252 390 Q 178 418 135 480 T 95 565 L 82 595"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 252 390 Q 178 418 135 480 T 95 565 L 82 595"
              fill="none"
              stroke="#ff6b00"
              strokeWidth="1.2"
              strokeDasharray="20 16"
              opacity="0.75"
            />
            <circle cx="82" cy="595" r="2.5" fill="#ffe600" />
          </g>

          {/* Leg R1 */}
          <g className="leg leg-r1">
            <path
              d="M 355 285 Q 415 270 455 295 T 490 340 L 505 365"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 355 285 Q 415 270 455 295 T 490 340 L 505 365"
              fill="none"
              stroke="#ffb703"
              strokeWidth="1.2"
              strokeDasharray="14 10"
              opacity="0.85"
            />
            <circle cx="505" cy="365" r="2.2" fill="#ffe600" />
          </g>

          {/* Leg R2 */}
          <g className="leg leg-r2">
            <path
              d="M 355 318 Q 425 310 470 345 T 515 410 L 530 440"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M 355 318 Q 425 310 470 345 T 515 410 L 530 440"
              fill="none"
              stroke="#ff9f1c"
              strokeWidth="1.2"
              strokeDasharray="16 12"
              opacity="0.8"
            />
            <circle cx="530" cy="440" r="2.2" fill="#ffe600" />
          </g>

          {/* Leg R3 */}
          <g className="leg leg-r3">
            <path
              d="M 352 355 Q 432 360 480 410 T 525 485 L 540 520"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6.5"
              strokeLinecap="round"
            />
            <path
              d="M 352 355 Q 432 360 480 410 T 525 485 L 540 520"
              fill="none"
              stroke="#ff8500"
              strokeWidth="1.2"
              strokeDasharray="18 14"
              opacity="0.75"
            />
            <circle cx="540" cy="520" r="2.4" fill="#ffe600" />
          </g>

          {/* Leg R4 */}
          <g className="leg leg-r4">
            <path
              d="M 348 390 Q 422 418 465 480 T 505 565 L 518 595"
              fill="none"
              stroke="url(#chitin-shell)"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d="M 348 390 Q 422 418 465 480 T 505 565 L 518 595"
              fill="none"
              stroke="#ff6b00"
              strokeWidth="1.2"
              strokeDasharray="20 16"
              opacity="0.75"
            />
            <circle cx="518" cy="595" r="2.5" fill="#ffe600" />
          </g>
        </g>

        {/* ================= PEDIPALPS & MUSCULAR CLAWS ================= */}
        {/* LEFT PEDIPALP & CHELA */}
        <g className="pedipalp pedipalp-left">
          {/* Upper Arm (Femur) */}
          <path
            d="M 255 240 C 215 200, 175 190, 150 165 C 145 160, 150 152, 160 155 C 190 175, 230 195, 265 225 Z"
            fill="url(#chitin-shell)"
            stroke="#ff9f1c"
            strokeWidth="1.5"
          />
          <circle cx="152" cy="162" r="9" fill="#181410" stroke="#ffb703" strokeWidth="2" />

          {/* Forearm (Patella) */}
          <path
            d="M 152 162 C 132 142, 120 115, 115 85 C 122 80, 130 84, 134 92 C 142 118, 152 138, 165 156 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="1.5"
          />
          <circle cx="120" cy="85" r="8" fill="#181410" stroke="#ffb703" strokeWidth="2" />

          {/* Heavy Muscular Palm (Manus) */}
          <path
            d="M 125 90 C 95 72, 85 45, 105 28 C 125 15, 145 35, 138 85 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="2"
          />

          {/* Fixed Inner Pincer Claw */}
          <path
            d="M 132 40 C 145 30, 155 15, 150 -5 C 138 5, 128 20, 118 32 Z"
            fill="url(#chitin-shell)"
            stroke="#ffe600"
            strokeWidth="1.5"
            filter="url(#soft-glow)"
          />

          {/* Movable Outer Dactyl Claw */}
          <g className="claw-finger-movable-l">
            <path
              d="M 106 32 C 92 14, 102 -5, 140 -5 C 120 8, 110 22, 112 36 Z"
              fill="#181410"
              stroke="#ffe600"
              strokeWidth="2"
            />
            <path
              d="M 112 30 Q 118 10 140 -5"
              fill="none"
              stroke="#ff5400"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* RIGHT PEDIPALP & CHELA */}
        <g className="pedipalp pedipalp-right">
          {/* Upper Arm (Femur) */}
          <path
            d="M 345 240 C 385 200, 425 190, 450 165 C 455 160, 450 152, 440 155 C 410 175, 370 195, 335 225 Z"
            fill="url(#chitin-shell)"
            stroke="#ff9f1c"
            strokeWidth="1.5"
          />
          <circle cx="448" cy="162" r="9" fill="#181410" stroke="#ffb703" strokeWidth="2" />

          {/* Forearm (Patella) */}
          <path
            d="M 448 162 C 468 142, 480 115, 485 85 C 478 80, 470 84, 466 92 C 458 118, 448 138, 435 156 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="1.5"
          />
          <circle cx="480" cy="85" r="8" fill="#181410" stroke="#ffb703" strokeWidth="2" />

          {/* Heavy Muscular Palm (Manus) */}
          <path
            d="M 475 90 C 505 72, 515 45, 495 28 C 475 15, 455 35, 462 85 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="2"
          />

          {/* Fixed Inner Pincer Claw */}
          <path
            d="M 468 40 C 455 30, 445 15, 450 -5 C 462 5, 472 20, 482 32 Z"
            fill="url(#chitin-shell)"
            stroke="#ffe600"
            strokeWidth="1.5"
            filter="url(#soft-glow)"
          />

          {/* Movable Outer Dactyl Claw */}
          <g className="claw-finger-movable-r">
            <path
              d="M 494 32 C 508 14, 498 -5, 460 -5 C 480 8, 490 22, 488 36 Z"
              fill="#181410"
              stroke="#ffe600"
              strokeWidth="2"
            />
            <path
              d="M 488 30 Q 482 10 460 -5"
              fill="none"
              stroke="#ff5400"
              strokeWidth="1.5"
            />
          </g>
        </g>

        {/* ================= MESOSOMA (BODY TERGITES) ================= */}
        <g className="scorpion-body">
          {/* Tergite 7 */}
          <path
            d="M 268 430 Q 300 442 332 430 L 328 450 Q 300 458 272 450 Z"
            fill="url(#chitin-shell)"
            stroke="#ff6b00"
            strokeWidth="1.2"
          />
          {/* Tergite 6 */}
          <path
            d="M 262 408 Q 300 422 338 408 L 334 428 Q 300 438 266 428 Z"
            fill="url(#chitin-shell)"
            stroke="#ff8500"
            strokeWidth="1.2"
          />
          {/* Tergite 5 */}
          <path
            d="M 256 384 Q 300 400 344 384 L 340 404 Q 300 416 260 404 Z"
            fill="url(#chitin-shell)"
            stroke="#ff9f1c"
            strokeWidth="1.2"
          />
          {/* Tergite 4 */}
          <path
            d="M 252 358 Q 300 375 348 358 L 344 380 Q 300 394 256 380 Z"
            fill="url(#chitin-shell)"
            stroke="#ff9f1c"
            strokeWidth="1.2"
          />
          {/* Tergite 3 */}
          <path
            d="M 249 330 Q 300 350 351 330 L 348 354 Q 300 370 252 354 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="1.2"
          />
          {/* Tergite 2 */}
          <path
            d="M 247 302 Q 300 322 353 302 L 350 326 Q 300 342 250 326 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="1.2"
          />
          {/* Tergite 1 */}
          <path
            d="M 248 278 Q 300 298 352 278 L 349 298 Q 300 316 251 298 Z"
            fill="url(#chitin-shell)"
            stroke="#ffc300"
            strokeWidth="1.4"
          />

          {/* Sculpted Head Carapace */}
          <path
            d="M 250 236 C 265 208, 335 208, 350 236 C 366 258, 362 278, 349 282 C 300 296, 300 296, 251 282 C 238 278, 234 258, 250 236 Z"
            fill="url(#chitin-shell)"
            stroke="#ffb703"
            strokeWidth="2.2"
          />

          {/* Carapace contours */}
          <path
            d="M 268 240 Q 300 252 332 240"
            fill="none"
            stroke="#ff9f1c"
            strokeWidth="1.5"
            opacity="0.8"
          />
          <path
            d="M 274 264 Q 300 276 326 264"
            fill="none"
            stroke="#ff8500"
            strokeWidth="1.5"
            opacity="0.75"
          />

          {/* Central Reactor Core */}
          <polygon
            points="300,246 310,259 300,272 290,259"
            className="reactor-core"
            fill="#ffb703"
            filter="url(#soft-glow)"
          />

          {/* Median Eyes */}
          <circle cx="294" cy="240" r="3.2" className="scorpion-eye" fill="#ffe600" filter="url(#soft-glow)" />
          <circle cx="306" cy="240" r="3.2" className="scorpion-eye" fill="#ffe600" filter="url(#soft-glow)" />

          {/* Lateral Eyes */}
          <circle cx="264" cy="238" r="1.8" fill="#ffb703" />
          <circle cx="259" cy="243" r="1.5" fill="#ff9f1c" />
          <circle cx="336" cy="238" r="1.8" fill="#ffb703" />
          <circle cx="341" cy="243" r="1.5" fill="#ff9f1c" />
        </g>

        {/* ================= METASOMA (ARCHED CONTINUOUS 5-SEGMENT TAIL) ================= */}
        <g className="scorpion-tail-assembly">
          {/* Tail Segment 1 (Posterior base segment) */}
          <g className="tail-seg tail-seg-1">
            <path
              d="M 282 445 C 278 475, 322 475, 318 445 Z"
              fill="url(#chitin-tail-seg)"
              stroke="#ff7b00"
              strokeWidth="2"
            />
            {/* Keel ridge */}
            <line x1="300" y1="445" x2="300" y2="470" stroke="#ffb703" strokeWidth="2" className="tail-energy-line" />
          </g>

          {/* Tail Segment 2 (Lowest arch looping out) */}
          <g className="tail-seg tail-seg-2">
            <path
              d="M 284 468 C 280 508, 320 508, 316 468 Z"
              fill="url(#chitin-tail-seg)"
              stroke="#ff9f1c"
              strokeWidth="2"
            />
            <line x1="300" y1="468" x2="300" y2="504" stroke="#ffb703" strokeWidth="2.2" className="tail-energy-line" />
          </g>

          {/* Tail Segment 3 (Central rising arch) */}
          <g className="tail-seg tail-seg-3">
            <path
              d="M 284 502 C 278 545, 322 545, 316 502 Z"
              fill="url(#chitin-tail-seg)"
              stroke="#ffb703"
              strokeWidth="2"
            />
            <line x1="300" y1="502" x2="300" y2="538" stroke="#ffc300" strokeWidth="2.5" className="tail-energy-line" />
          </g>

          {/* Tail Segment 4 (Curling overhead forward) */}
          <g className="tail-seg tail-seg-4">
            <path
              d="M 286 185 C 275 142, 325 142, 314 185 Z"
              fill="url(#chitin-tail-seg)"
              stroke="#ffc300"
              strokeWidth="2"
            />
            <line x1="300" y1="185" x2="300" y2="150" stroke="#ffe600" strokeWidth="2.5" className="tail-energy-line" />
          </g>

          {/* Tail Segment 5 & Telson Bulb & Needle Stinger */}
          <g className="tail-telson-stinger">
            {/* Segment 5 neck */}
            <path
              d="M 288 148 C 282 125, 318 125, 312 148 Z"
              fill="url(#chitin-tail-seg)"
              stroke="#ffe600"
              strokeWidth="2"
            />

            {/* Glowing Bulbous Telson (Venom gland) */}
            <ellipse
              cx="300"
              cy="105"
              rx="19"
              ry="25"
              fill="url(#telson-glow)"
              stroke="#ffe600"
              strokeWidth="2.2"
              className="telson-bulb"
              filter="url(#soft-glow)"
            />

            {/* Armored chitin ribs across the venom bulb */}
            <path
              d="M 286 98 C 293 88, 307 88, 314 98"
              fill="none"
              stroke="#18130c"
              strokeWidth="3.2"
            />
            <path
              d="M 288 110 C 294 102, 306 102, 312 110"
              fill="none"
              stroke="#18130c"
              strokeWidth="3.2"
            />

            {/* Deadly Aculeus (Curved needle stinger) */}
            <path
              d="M 300 82 C 303 66, 314 48, 300 28 C 294 44, 291 60, 298 82 Z"
              fill="url(#stinger-plasma)"
              stroke="#ffffff"
              strokeWidth="1.2"
              className="stinger-blade"
              filter="url(#hyper-glow)"
            />

            {/* Radiant Spark At The Tip */}
            <circle
              cx="300"
              cy="28"
              r="4.5"
              className="stinger-spark"
              fill="#ffffff"
              filter="url(#hyper-glow)"
            />
            <circle
              cx="300"
              cy="28"
              r="11"
              className="stinger-plasma-halo"
              fill="#ffe600"
              opacity="0.75"
              filter="url(#soft-glow)"
            />

            {/* Trailing venom plasma drop */}
            <circle
              cx="300"
              cy="22"
              r="2"
              className="venom-drop"
              fill="#ffffff"
              filter="url(#soft-glow)"
            />
          </g>
        </g>
      </svg>
    </div>
  )
}
