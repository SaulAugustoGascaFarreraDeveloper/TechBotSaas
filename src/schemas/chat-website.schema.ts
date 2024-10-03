import z, { ZodType } from "zod"

export type ValidWebsiteProps = {
    url: string
}


export type ChatWebsiteProps = {
    role?: "user" | "bot"
    message?: string
}


export type GenerateAudioContentProps = {
    content: string
}


export const ValidWebsiteSchema: ZodType<ValidWebsiteProps> = z.object({
    url: z.string().min(1,{message: "A valid url website is required"}),
})


// ChatWebsiteSchema with optional message
export const ChatWebsiteSchema: ZodType<ChatWebsiteProps> = z.object({
    role: z.enum(["user", "bot"]).default("bot").transform(val => val || "bot"),
    message: z.string().min(1, { message: "Message is required" }).optional() // message is optional
})


export const GenerateAudioContentSchema: ZodType<GenerateAudioContentProps> = z.object({
    content: z.string().min(10,{message: "Content field is required"})
})