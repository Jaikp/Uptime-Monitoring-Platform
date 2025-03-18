"use client";

import EditMonitor from "@/components/monitor/EditMonitor";
import { Button } from "@/components/ui/button";
import { delMonitor } from "@/server-actions/delMonitor";
import { getMonitorData } from "@/server-actions/getMonitorData";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth()
  const router = useRouter();
  const { slug } = React.use(params); // Unwrap the params Promise

  const [values, setValues] = useState<{
    id: string;
    url: string;
    status: string;
    frequency: number;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  } | null>(null);

  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [time, setTime] = useState({ Days: 0, Hours: 0, Minutes: 0 });

  useEffect(() => {
    async function loadData() {
      const response = await getMonitorData(slug);
      console.log(response);
      setValues(response);
      setLoading(false);

      const time1: any = new Date(response?.updatedAt || "");
      const time2: any = new Date();
      const Days = (time2 - time1) / 86_400_000;
      const Hours = (time2 - time1) / 3_600_000;
      const Minutes = (time2 - time1) / 60_000;
      setTime({
        Days: Math.trunc(Days),
        Hours: Math.trunc(Hours),
        Minutes: Math.trunc(Minutes % 60),
      });
    }

    loadData();
  }, [slug,edit]); // Add slug to the dependency array

  const handleDelete = async ()=>{
    const response = await delMonitor(slug);
    router.push("/monitors")
  }

  // Redirect if unauthenticated
  if (!isSignedIn) {
    router.push("/");
    return null; // Stop rendering after redirect
  }

  // Show loading state
  if (loading || isLoaded) {
    return (
      <div className="w-screen h-screen flex justify-center items-center animate-pulse">
        <h1 className="text-2xl text-white">Loading...</h1>
      </div>
    );
  }

  if(edit){
    return(
        <EditMonitor id={slug} setEdit={setEdit} url={values?.url} />
    )
  }

  return (
    <div className="flex justify-center mt-10 text-white">
      <div className="max-w-[1040px] flex flex-col gap-10 w-full">
        <div className="border border-slate-500 shadow-md justify-between p-4 flex items-center">
            <div className="flex items-center gap-5">
                {values?.status === "UP" ? (
                <div className="size-4 bg-green-500 rounded-full">
                    <div className="size-4 bg-green-500 rounded-full animate-ping"></div>
                </div>
                ) : (
                <div className="size-4 bg-red-600 rounded-full">
                    <div className="size-4 bg-red-600 rounded-full animate-ping"></div>
                </div>
                )}
                <h1>{values?.url}</h1>
            </div>
            <div className="flex items-center gap-4">
                <Button onClick={()=> setEdit(true)} className="bg-transparent border border-gray-500 hover:bg-gray-700 text-gray-300">Edit</Button>
                
                <button className="p-2 rounded-lg hover:bg-gray-700 transition">
                    <Trash2 className="w-6 h-6 text-gray-400 hover:text-red-500 transition" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}


// {values?.status === "UP" ? (
//     <p>
//       <span className="text-md">Uptime</span>: {time.Days} Days{" "}
//       {time.Hours} Hours {time.Minutes} Minutes
//     </p>
//   ) : (
//     <p>Down</p>
//   )}