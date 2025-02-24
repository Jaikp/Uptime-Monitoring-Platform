"use client"
import MonitorCard from '@/components/monitor/MonitorCard';
import { useToast } from '@/hooks/use-toast';
import { getMonitors } from '@/server-actions/getMonitors';

import { monitorurl } from '@/types/monitorurl';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
    
    const [values, setValues] = useState<monitorurl[]>([]);
    const [filter, setFilter] = useState<monitorurl[]>([]);

    const session = useSession();
    const { toast } = useToast();
    const router = useRouter()
    useEffect(() => {
      async function loadData (){
        
        const response = await getMonitors();
        setValues(response);
        setFilter(response);
      }
      loadData();
    },[])

    const handleChange = (e : any)=>{
        if(e.target.value === ""){
            setFilter(values);
            return;
        }
        const filterBySearch : monitorurl[] = values.filter( (item) => {
            if(item.url.toLowerCase().includes(e.target.value.toLowerCase())){
                return item;
            }
        })
        setFilter(filterBySearch);
    }

    if(session.status === "unauthenticated"){

        router.push('/')

    }
    
  return (
    <div className='flex justify-center mt-10'>
        <div className='max-w-[1040px] flex flex-col gap-10'>
            <div className='flex justify-between gap-52'>
                <div>
                    <h1 className='text-white text-3xl'>How is it going, {session.data?.user?.name?.split(" ")[0]}?</h1>
                </div>
                <div className='flex gap-4 items-center'>
                    <div>
                        <input onChange={(e)=>handleChange(e)} className='border border-gray-500 bg-[#202433] rounded px-2 text-white py-1' type="text" placeholder='search' name="fname"></input>
                    </div>
                    <div>
                        <Link href='/monitors/new'><button className='bg-[#9290C3] hover:bg-[#535C91] text-[#070F2B] py-1 px-7 rounded'>Create new</button></Link>
                    </div>
                </div>
            </div>

            <div className='w-full border border-slate-600 flex flex-col gap-2 p-4 text-white rounded backdrop-blur-xl'>

                {filter.map((value,index) => {
                    return <MonitorCard key={index} url={value.url} status={value.status} id={value.id} frequency={undefined} userId={undefined} createdAt={undefined} updatedAt={undefined}/>
                })}

            </div>
        </div>
    </div>
  )
}

export default page