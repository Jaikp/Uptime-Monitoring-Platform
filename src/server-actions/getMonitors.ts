"use server"
import prisma from "@/db/prisma";
import { auth } from "@/auth";

export async function getMonitors() {

    const session = await auth();
    const response = await prisma.monitor.findMany({
        where : {
            userId : session?.user?.id || ""
        }
    })
    return response;
}