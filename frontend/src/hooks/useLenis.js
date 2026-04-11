import Lenis from 'lenis'
import { useEffect, useRef } from 'react'

export default function useLenis() {
  const lenisRef = useRef(null)

  useEffect(() => {
    if (lenisRef.current) return

    const lenis = new Lenis()
    lenisRef.current = lenis

    let rafId

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])
}