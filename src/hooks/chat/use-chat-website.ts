import { useForm } from "react-hook-form"
import { toast, useToast } from "../use-toast"
import { ChatWebsiteProps, ChatWebsiteSchema, GenerateAudioContentProps, GenerateAudioContentSchema, GenerateudioContentProps, ValidWebsiteProps, ValidWebsiteSchema } from "@/schemas/chat-website.schema"
import {zodResolver} from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { onChatWithWebsite, onValidUrlWebsite } from "@/actions/chat-website"
import { useChatContextProvider } from "@/context/use-chat-website-context"
import ChatWebsiteForm from "@/components/form/chat-website/chat-website-form"
import { onTTS } from "@/actions/tts"
import dotenv from "dotenv"

dotenv.config()

export const useValidWebsite = () => {

        const {toast} = useToast()
        const [loading,setLoading]  = useState<boolean>(false)

        // Desestructuración del contexto
        const { currentStep, setCurrentStep } = useChatContextProvider();


        const methods = useForm<ValidWebsiteProps>({
            resolver: zodResolver(ValidWebsiteSchema),
            mode: "onChange"
        })


        const onHandleSubmit = methods.handleSubmit(async (values) => {

            
            
            try{
                setLoading(true)
    
                const result = await onValidUrlWebsite(values.url)
    
                if(result?.status === 200)
                {
    
                    console.log(result)
    
                    setCurrentStep((prev: number) => prev + 1);
                    
    
                    toast({
                        title: 'Success',
                        description: result.message,
                        variant: "success"
                    })
    
                    
    
                    setLoading(false)
           
                    
                }
    
    
               }catch(error)
               {
                    console.log("Valid Url Error --> ",error)
    
                    toast({
                        title: 'Error',
                        description: "Something went wrong with the Url,try again !!",
                        variant: "destructive"
                    })
               }
          

        })

      


       return {methods,onHandleSubmit,loading}
}


export const useChatWebsite = () => {

    const [loading,setLoading] = useState<boolean>(false)
    const [messages,setMessages] = useState<ChatWebsiteProps[]>([])
    
    const {toast} = useToast()

    const methods = useForm<ChatWebsiteProps>({
        resolver: zodResolver(ChatWebsiteSchema),
        mode: "onChange"
    })


    const onHandleSubmit = methods.handleSubmit(async (values) => {

        
        


        try{

            setLoading(true)

            const response  = await onChatWithWebsite(values.message as string)

            //console.log("CHAT RES MIO --> ",response?.message)

            setMessages([...messages,{role: "user",message: values.message},{role: "bot",message: response?.message}])
     

            methods.reset()

            

        }catch(error){
            console.log("Chat Website Error -->" ,error)

            toast({
                title: 'Error',
                description: 'Somethign wnet wrong to process the message,Try again !!',
                variant: "destructive"
            })
        }finally{
            setLoading(false)
        }

    }) 


    return {loading,onHandleSubmit,methods,messages}

}


export const useGenerateAudioContent = () => {

    const [loading,setLoading] = useState<boolean>(false)

    const {toast} = useToast()


    const methods = useForm<GenerateAudioContentProps>({
        resolver: zodResolver(GenerateAudioContentSchema),
        mode: "onChange"
    })


    const onHandleSubmit = methods.handleSubmit(async (values) => {

        try{

            setLoading(true)

            await onTTS(values.content)
            console.log("OPEN IA AKEY   ",process.env.OPENAI_API_KEY)
            console.log("CONTENT FORM --> ",values.content)


            toast({
                title: "Success",
                description: "Audio Content created succesfully !!",
                variant: "success"
            })

            methods.reset()

        }catch(error){

            console.log("Use Generate Audio Error --> ",error)

            toast({
                title: "Error",
                description: "Audio Content creation failed,try again !!",
                variant: "destructive"
            })

        }finally{
                setLoading(false)
        }

    })


    return {loading,onHandleSubmit,methods}

}