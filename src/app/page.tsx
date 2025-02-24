"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function Home() {

  const session = useSession();
  const router = useRouter();
  const handleClick = ()=>{
    if(session.status === "authenticated"){
      toast({
        variant : "default",
        title: "created",
        description: "url monitor"
      })
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
      
      <div className="flex w-full max-w-4xl h-16 items-center space-x-2">
        <Input className="rounded-xl text-[#9290C3] text-2xl border border-[#9290C3] w-5/6 h-full" type="email" placeholder="https://example.com"/>
        <Button onClick={handleClick} className="rounded-xl font-extrabold text-lg bg-[#9290C3] text-[#070F2B] hover:bg-[#535C91] px-6 w-1/6 h-full" type="submit">MONITOR</Button>
      </div>
    <div> 
      <h1 className="text-[#9290C3] text-3xl max-sm:text-5xl max-sm:leading-normal max-w-[1040px] text-center font-extralight leading-normal">Stay Connected, Stay Informed</h1>
      <h1 className="text-[#9290C3] text-3xl max-sm:text-5xl max-sm:leading-normal max-w-[1040px] text-center font-extralight leading-normal"> Monitor Your Digital World!</h1>
    </div>
   
      
   </div>
  );
}
