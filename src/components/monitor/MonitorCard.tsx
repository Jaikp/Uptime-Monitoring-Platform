import { monitorurl } from '@/types/monitorurl';
import Link from 'next/link';
import React from 'react'
import { LuActivity } from "react-icons/lu";
import { LuAlertTriangle } from "react-icons/lu";
const MonitorCard = ({props} : {props : monitorurl}) => {

  return (
    <div>
      <Link href={`/monitors/${props.id}`}>
        <div className='w-full border border-slate-600 flex text-white px-4 py-4 rounded hover:bg-slate-800 justify-between'>
            <div>
                <p>{props.url}</p>
            </div>
            
            {props.status === "UP" ? 
              <div className='flex items-center text-[#51ff0d] drop-shadow-2xl animate-pulse text-2xl'>
                <LuActivity />
              </div> : 
              <div className='flex items-center text-[#eed202] drop-shadow-2xl animate-pulse text-2xl'>
                <LuAlertTriangle />
              </div>  
            }
        </div>
        </Link>
    </div>
  )
}

export default MonitorCard