"use client"

import { useEffect, useState } from "react"
import { SettingsDialog } from "@/components/modals/settings-modal"

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <SettingsDialog />
    </>
  )
}
