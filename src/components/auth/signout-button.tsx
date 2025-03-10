import { signOut } from "@/auth"
import { Button } from "../ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button className="bg-[#535C91] hover:bg-[#1B1A55]"  type="submit">Sign Out</Button>
    </form>
  )
}