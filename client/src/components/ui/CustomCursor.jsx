import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    let mouseX = 0
    let mouseY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(cursor, {
        x: mouseX - 5,
        y: mouseY - 5,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(follower, {
        x: mouseX - 18,
        y: mouseY - 18,
        duration: 0.4,
        ease: 'power2.out',
      })
    }

    const onMouseEnterLink = () => {
      gsap.to(cursor, { scale: 3, duration: 0.3 })
      gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.3 })
    }

    const onMouseLeaveLink = () => {
      gsap.to(cursor, { scale: 1, duration: 0.3 })
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMouseMove)

    const links = document.querySelectorAll('a, button, [data-cursor="pointer"]')
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink)
      link.addEventListener('mouseleave', onMouseLeaveLink)
    })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink)
        link.removeEventListener('mouseleave', onMouseLeaveLink)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor hidden lg:block"
        style={{ left: 0, top: 0 }}
      />
      <div
        ref={followerRef}
        className="cursor-follower hidden lg:block"
        style={{ left: 0, top: 0 }}
      />
    </>
  )
}

export default CustomCursor
