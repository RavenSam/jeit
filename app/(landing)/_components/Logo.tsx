import { cn } from "@/lib/utils"
import { Poppins } from "next/font/google"
import Image from "next/image"

const font = Poppins({ subsets: ["latin"], weight: ["400", "600"] })

export default function Logo() {
   return (
      <div className="flex items-center gap-x-2">
         <Image alt="Logo" src={"/logo.svg"} height={40} width={40} className="dark:hidden" />
         <Image alt="Logo" src={"/logo-dark.svg"} height={40} width={40} className="hidden dark:block" />

         <p className={cn("font-semibold hidden md:block tracking-[5px]", font.className)}>Jeit</p>
      </div>
   )
}
