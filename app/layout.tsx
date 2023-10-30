import { ReactNode } from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

import { ThemeProvider } from "@/components/providers/theme-provider"
import ConvexClientProvider from "@/components/providers/convex-provider"
import { Toaster } from "sonner"
import { EdgeStoreProvider } from "@/lib/edgestore"

import "./globals.css"
import ModalProvider from "@/components/providers/modal-provider"
import NextNProgressClient from "@/components/next-progress"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
   title: "Jeit",
   description: "Lightning fast personal editor",
   icons: {
      icon: [
         {
            media: "(prefers-color-scheme: light)",
            url: "/logo.svg",
            href: "/logo.svg",
         },
         {
            media: "(prefers-color-scheme: dark)",
            url: "/logo-dark.svg",
            href: "/logo-dark.svg",
         },
      ],
   },
}

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en" suppressHydrationWarning>
         <body className={inter.className}>
            <ConvexClientProvider>
               <EdgeStoreProvider>
                  <ThemeProvider
                     attribute="class"
                     defaultTheme="system"
                     enableSystem
                     disableTransitionOnChange
                     storageKey="jet-theme"
                  >
                     {children}

                     <Toaster position="bottom-center" />

                     <NextNProgressClient />

                     <ModalProvider />
                  </ThemeProvider>
               </EdgeStoreProvider>
            </ConvexClientProvider>
         </body>
      </html>
   )
}
