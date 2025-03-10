import { auth } from "../auth"
 
export default async function UserAvatar() {
  
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <img className="size-9 rounded-full" src={session.user.image || ""} alt="User Avatar" />
    </div>
  )
}