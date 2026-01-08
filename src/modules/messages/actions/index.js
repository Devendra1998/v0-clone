"use server"

import { inngest } from "@/inngest/client";

export const invokeAI = async () => {
    
    await inngest.send({
        name: "agent/hello"
    })
}