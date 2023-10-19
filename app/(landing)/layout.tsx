import { ReactNode } from "react"
import Navbar from "./_components/Navbar"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full bg-background">
      <Navbar />

      <main className="h-full">{children}</main>
    </div>
  )
}
