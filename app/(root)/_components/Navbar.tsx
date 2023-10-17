"use client"

import Logo from './Logo'
import { cn } from '@/lib/utils'
import { useScrollTop } from '@/hooks/use-scroll-top'
import { Button } from '@/components/ui/button'

export default function Navbar() {
    const scrolled = useScrollTop()


    return (
        <div className={cn("z-50 fixed top-0 flex items-center w-full p-4 md:px-6", scrolled && "border-b bg-background shadow-sm")}>
            <Logo/>

            <div className="ml-auto justify-end w-full flex items-center gap-x-2">
                <Button variant={"ghost"} className='font-semibold tracking-widest'>Login</Button>
            </div>
        </div>
    )
}
