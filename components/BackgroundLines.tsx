import { useEffect, useRef } from 'react'
import TimelineLite from 'gsap/TimelineLite'
import { Power2 } from 'gsap/EasePack'

type Props = {
  className?: string
}

function makeAnimation (line: SVGLineElement, direction: number = 1, delay: number = 0): void {
  const length = line.getTotalLength()

  new TimelineLite()
    .set(line, { opacity: 0, strokeDasharray: length, strokeDashoffset: length * direction })
    .set(line, { opacity: 1 }, delay)
    .to(line, 1, { strokeDashoffset: 0, ease: Power2.easeOut })
}

const BackgroundLines: React.FC<Props> = ({ className }) => {
  const el = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!el.current) {
      return
    }

    const lines = Array.from(el.current.querySelectorAll('line'))

    makeAnimation(lines[0], -1, Math.random())
    makeAnimation(lines[1], -1, Math.random())
    makeAnimation(lines[2], 1, Math.random())
  }, [el])

  return (
    <div className={className} ref={el}>
      <svg width="156" height="278" viewBox="0 0 156 278" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="41" y1="115.172" x2="152.723" y2="3.4487" stroke="#2AD78C" strokeWidth="4" strokeLinecap="round" />
        <line x1="30" y1="151.723" x2="141.723" y2="40" stroke="#2AD78C" strokeWidth="4" strokeLinecap="round" />
        <line x1="3" y1="274.723" x2="114.723" y2="163" stroke="#2AD78C" strokeWidth="4" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export default BackgroundLines
