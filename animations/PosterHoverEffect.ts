import { useEffect } from 'react'
import TweenLite from 'gsap/TweenLite'
import 'gsap/CSSPlugin'

/**
 * Adds a mouse tracking perspective over effect to poster images
 *
 * @param containerRef
 * @param posterRef
 */
export function usePosterHoverEffect (
  containerRef: React.MutableRefObject<HTMLDivElement | null>,
  posterRef: React.MutableRefObject<HTMLDivElement | null>
): void {
  // The current mouse position
  let position = { x: 0, y: 0 }

  let updateRequest

  const onPositionChange = (e: MouseEvent) => {
    position = {
      x: e.clientX,
      y: e.clientY
    }

    cancelAnimationFrame(updateRequest)
    updateRequest = requestAnimationFrame(update)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onPositionChange)

    return () => {
      window.removeEventListener('mousemove', onPositionChange)
    }
  }, [])

  // Setup 3d styles for the container when the element is
  // rendered and update the animation
  useEffect(() => {
    if (!containerRef.current) {
      return
    }

    TweenLite.set(containerRef.current, {
      perspective: 1000,
      transformStyle: 'preserve-3d'
    })

    cancelAnimationFrame(updateRequest)
    updateRequest = requestAnimationFrame(update)

    return () => cancelAnimationFrame(updateRequest)
  }, [containerRef, posterRef])

  const update = () => {
    const container = containerRef.current
    const poster = posterRef.current

    if (!poster || !container) {
      return
    }

    // TODO: don't need to calculate these every update
    const dimens = container.getBoundingClientRect()

    const isInX = position.x >= dimens.left && position.x <= dimens.left + dimens.width
    const isInY = position.y >= dimens.top && position.y <= dimens.top + dimens.height

    if (!isInX || !isInY) {
      // The mouse isn't over the poster so animate to the initial state
      TweenLite.to(poster, 1, { transform: 'none' })
      return
    }

    // Center of the poster
    const center = {
      x: dimens.width / 2,
      y: dimens.height / 2
    }

    // Distance of the mouce from the center of the poster
    const dist = {
      x: position.x - dimens.left - center.x,
      y: position.y - dimens.top - center.y
    }

    // Calculate the rotation values for the transform based on distance from center
    const tilt = {
      x: dist.y / center.y,
      y: -dist.x / center.x
    }
    const radius = Math.sqrt(Math.pow(tilt.x, 2) + Math.pow(tilt.y, 2))
    const degree = (radius * 12)

    TweenLite.to(poster, 1, {
      transform: `scale(1.02) rotate3d(${tilt.x}, ${tilt.y}, 0, ${degree}deg)`
    })
  }
}
