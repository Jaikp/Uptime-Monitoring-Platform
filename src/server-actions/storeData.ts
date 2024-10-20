"use server"
import prisma from "@/db/prisma";
import { auth } from "@/utils/auth";

export async function storeData(values : any) {

    const session = await auth();

    const response = await prisma.monitor.create({
        data : {
            url : values.url,
            userId : session?.user?.id || ""
        }
    })
    return response;
}