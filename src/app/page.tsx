"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const session = useSession();
  const router = useRouter();
  const handleClick = ()=>{
    if(session.status === "authenticated"){
      router.push('/monitors/new');
    }
    else{
      toast({
        variant: "destructive",
        title: "you are not logged in",
        description: "login to get access"
      })
    }
    
  }

  return (
   <div className="w-screen h-screen flex mt-60 items-center flex-col gap-10 ">
      <h1 className="text-[#9290C3] text-6xl max-sm:text-5xl max-sm:leading-normal max-w-[1040px] text-center font-extralight leading-normal">Stay Connected, Stay Informed: Monitor Your Digital World!</h1>
      <Button onClick={handleClick} className="bg-[#9290C3] text-[#070F2B] hover:bg-[#535C91]">Monitor URL</Button>
   </div>
  );
}
