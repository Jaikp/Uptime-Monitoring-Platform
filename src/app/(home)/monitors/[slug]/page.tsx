"use client"
import { getMonitorData } from "@/server-actions/getMonitorData"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export default function Page({ params }: { params: { slug: string } }) {

    const [values, setValues] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [time, setTime] = useState({Days : 0 , Hours : 0 , Minutes : 0});
    const router = useRouter();
    useEffect(() => {
      async function loadData(){
        const response = await getMonitorData(params.slug);
        setValues(response);
        setLoading(false);
        const time1 :any  = new Date(response?.updatedAt || "") ;
        const time2: any = new Date();
        const Days = (time2 - time1) /86_400_000;
        const Hours = (time2 - time1) /3_600_000;
        const Minutes = (time2 - time1) /60_00;
        setTime({Days : Math.trunc(Days) ,Hours : Math.trunc(Hours) , Minutes : Math.trunc(Minutes%60)});
      }
      loadData();
    }, [])

    const session = useSession();

    if(session.status === "unauthenticated"){

        router.push('/')

    }



    if(loading){
        return (
            <div className=" w-screen h-screen flex justify-center items-center animate-pulse">
                <h1 className="text-2xl text-white">Loading...</h1>
            </div>
        )
    }
    
    return (
        <div className="flex justify-center mt-10 text-white">
            <div className="max-w-[1040px] flex flex-col gap-10 w-full">
                <div className="border border-slate-500 shadow-md justify-between p-4 flex items-center">
                    <div className="flex items-center gap-5">
                        {values.status === "UP"?
                            <div className="size-4 bg-green-500 rounded-full ">
                                <div className="size-4 bg-green-500 rounded-full animate-ping">
                                </div>
                            </div>    
                            :
                            <div className="size-4 bg-red-600 rounded-full ">
                                <div className="size-4 bg-red-600 rounded-full animate-ping">
                                </div>
                            </div>
                        }
                    <h1>{values.url}</h1>
                    </div>
                    {values.status === "UP"?
                        <p><span className="text-md">Uptime</span>: {time.Days} Days {time.Hours} Hours  {time.Minutes} Minutes </p>   
                        :
                        <p>Down</p>
                    }
                    
                </div>
                
            </div>

        </div>
    )
}