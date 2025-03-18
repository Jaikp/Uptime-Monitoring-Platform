"use server"
import prisma from "@/db/prisma";
import { auth } from "@clerk/nextjs/server";


export async function storeData(values : any) {

    const {userId} = await auth();

    const response = await prisma.monitor.create({
        data : {
            url : values.url,
            userId : userId || ""
        }
    })
    return response;
}