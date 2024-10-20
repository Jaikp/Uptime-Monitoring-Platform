"use client"
import React, { useState } from 'react'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from 'next/navigation'
import { storeData } from '@/server-actions/storeData'
import { useSession } from 'next-auth/react'
  

const formSchema = z.object({
    url: z.string().min(6,{
        message : "input correct url",
    }),
    alert: z.string().min(2,{
        message: "You have to select at least one item.",
    }),
    notify: z.array(z.string()).min(1, {
        message: "You have to select at least one item.",
    }),
  })



const page = () => {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const session = useSession();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          url: "https://",
          alert: '',
          notify: [],
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setSubmitting(true);

        const response = await storeData(values);
        
        if(response){
            router.push("/monitors");
        }

        setSubmitting(false);
    }

    if(session.status === "unauthenticated"){

        router.push('/')

    }



  return (
    <div className='flex justify-center mt-10'>
        <div className='flex flex-col gap-5 max-w-[1040px] w-full p-5'>
            <div className='flex'>
                <h1 className='text-3xl text-white'>Create new monitor</h1>
            </div>
            <div className='border border-slate-600 shadow-lg rounded p-5 '>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className='text-white'>
                                    <FormLabel className=''>URL</FormLabel>
                                    <FormControl className=''>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage/>          
                                </FormItem>
                                
                            )}
                            
                        />
                        
                        <FormField
                            control={form.control}
                            name="alert"
                            render={({ field }) => (
                            <FormItem className='text-white'>
                                        <FormLabel className=''>Alert us when</FormLabel>
                                        <FormControl className=''>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder=""/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="URL becomes unavailable">URL becomes unavailable </SelectItem>
                                                    <SelectItem value="Slow response time">Slow response time</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl> 
                                        <FormMessage/>  
                            </FormItem>
                        )}
                        />
                        <FormField
                            control={form.control}
                            name="notify"
                            render={({ field }) => (
                            <FormItem className='text-white'>
                                
                                <FormLabel>choose how to receive alerts</FormLabel>
                            
                                        <div className="items-center flex space-x-2">
                                            <Checkbox
                                                className='border border-white'
                                                checked={field.value.includes("SMS")}
                                                onCheckedChange={(checked) => {
                                                    const newValue = checked
                                                        ? [...field.value, "SMS"]
                                                        : field.value.filter((v) => v !== "SMS")
                                                    field.onChange(newValue)
                                                }}
                                            />
                                            <span>SMS</span>
                                            <Checkbox
                                                className='border border-white'
                                                checked={field.value.includes("Email")}
                                                onCheckedChange={(checked) => {
                                                    const newValue = checked
                                                        ? [...field.value, "Email"]
                                                        : field.value.filter((v) => v !== "Email")
                                                    field.onChange(newValue)
                                                }}
                                            />
                                            <span>Email</span>

                                            <Checkbox
                                                className='border border-white'
                                                checked={field.value.includes("Call")}
                                                onCheckedChange={(checked) => {
                                                    const newValue = checked
                                                        ? [...field.value, "Call"]
                                                        : field.value.filter((v) => v !== "Call")
                                                    field.onChange(newValue)
                                                }}
                                            />
                                            <span>Call</span>
                                    </div> 
                                    <FormMessage/>  
                            </FormItem>
                        )}
                        />
                        <Button className="bg-[#9290C3] text-[#070F2B] hover:bg-[#535C91]" type="submit" disabled={submitting}>{!submitting ? "Submit" : "submitting..."}</Button>
                    </form>
                </Form>
            </div>
        </div>
    </div>
  )
}

export default page