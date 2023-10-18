import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useUser, SignOutButton } from "@clerk/clerk-react"
import { LogOut } from "lucide-react"

export default function UserItem() {
  const { user } = useUser()
  return (
    <div className="py-3 px-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"} className="gap-3 px-3">
            <Avatar className="w-6 h-6">
              <AvatarImage src={user?.imageUrl} />
            </Avatar>

            <span className="font-medium line-clamp-1">{user?.username}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-80"
          align="start"
          alignOffset={11}
          forceMount
        >
          <div className="flex flex-col space-y-4 p-2">
            <p className="text-xs font-medium leading-none text-muted-foreground">
              {user?.emailAddresses[0].emailAddress}
            </p>

            <div className="flex items-center gap-x-2">
              <div className="rounded-md bg-secondary p-1">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.imageUrl} />
                </Avatar>
              </div>
              <div className="space-y-1">
                <p className="text-sm line-clamp-1">{user?.fullName}</p>
              </div>
            </div>
          </div>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer text-muted-foreground"
            asChild
          >
            <SignOutButton>
              <div className="flex items-center">
                <LogOut className="mr-3 h-5 w-5" />
                <span>Log out</span>
              </div>
            </SignOutButton>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
