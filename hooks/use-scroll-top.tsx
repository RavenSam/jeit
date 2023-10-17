import { useEffect, useState } from "react"

export const useScrollTop = (threshold = 10) => {
  const [scrolled, setscrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.screenY > threshold) {
        setscrolled(true)
      } else {
        setscrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [threshold])

  return scrolled
}
