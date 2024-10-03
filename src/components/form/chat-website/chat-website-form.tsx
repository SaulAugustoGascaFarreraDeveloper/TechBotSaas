"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChatContextProvider } from '@/context/use-chat-website-context'
import { useChatWebsite } from '@/hooks/chat/use-chat-website'
import { useToast } from '@/hooks/use-toast'
import { saveResponse } from '@/lib/indexedDB'
import { cn } from '@/lib/utils'
import { timeStamp } from 'console'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'


const MessageInput = () => {

    const {register} = useFormContext()

    return(
        <Input {...register('message')} className='w-full' placeholder='Ask something...' />
    )
}



const ChatWebsiteForm = () => {

    const {loading,onHandleSubmit,methods,messages} = useChatWebsite()

    const {currentStep,setCurrentStep} = useChatContextProvider()

   const {toast} = useToast()


    const handleSaveBotResponses = async (message: any) => {

        try{

            await saveResponse({message,role: 'bot',timestamp: new Date()})

            toast({
                title: 'Sucess',
                description: "Bot Response save succesfully",
                variant: 'success'
            })

            //console.log("Save Bot Response :)")

        }catch(error)
        {
            toast({
                title: 'Error',
                description: "Bot response cannot save, try again !!.",
                variant: 'destructive'
            })
            console.log("Error save data into IndexDB --> ",error)
        }

    }
   

  return (
    <FormProvider {...methods}>
        <form onSubmit={onHandleSubmit} className='flex flex-col gap-3 p-3 w-full' >
            
            <MessageInput />

            <Button disabled={loading} type='submit' className='w-full rounded-md' >
                   {loading ? <Loader2 size={20} className="animate-spin" />  : "Send Message"}
            </Button>

            {messages.length > 0 && (
                <div className='w-full flex flex-col-reverse gap-y-3' >
                    {messages.map((message,index) => (
                        <div key={index} className={cn('p-8 rounded-lg flex w-full md:items-start items-center gap-6 md:flex-row flex-col',
                            message.role === 'user' ? "bg-white border-2 border-black/70" : "bg-muted"
                        )} >
                            {message.role === "user" ? <span className='font-bold'>User</span> : <span className='font-bold' >Bot</span>}
                            <p className='text-sm'>{message.message}</p>
                            {message.role === 'bot' && (
                                <Button className='rounded-md' onClick={() => handleSaveBotResponses(message.message)} >
                                    Save Answer
                                </Button>
                            )}
                        </div>
                    ))}
                   
                        <Button onClick={() => setCurrentStep((prev) => prev + 1)}>
                            Generate Audio
                        </Button>
                    
                    
                </div>
            )}

        </form>
    </FormProvider>
  )
}

export default ChatWebsiteForm