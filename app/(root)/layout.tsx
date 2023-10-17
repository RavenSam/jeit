import { ReactNode } from "react"
import Navbar from "./_components/Navbar"

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="h-full">
        <Navbar />

        <main className="h-full">{children}</main>
      </body>
    </html>
  )
}
