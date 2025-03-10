"use server"
import prisma from "@/db/prisma";
import { auth } from "@/auth";

export async function getMonitorData(id : any) {

    const response = await prisma.monitor.findUnique({
        where :{
            id : id
        }
    })
    return response;
}