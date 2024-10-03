"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChatContextProvider, useChatContextProvider } from '@/context/use-chat-website-context'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import ChatWebsiteFormProvider from './form-provider'
import { useValidWebsite } from '@/hooks/chat/use-chat-website'
import { ValidUrlForm } from './valid-url-form'
import dynamic from 'next/dynamic'
import { Spinner } from '@/components/spinner'


type ChatWebsiteStepProps = {
    loading?: boolean
}


const ChatForm = dynamic(() => import("./chat-website-form"),{
    ssr: false,
    loading: Spinner
})

const TTSForm = dynamic(() => import('./text-to-speech-form'),{
    ssr: false,
    loading: Spinner
})

const ChatWebsiteStep = ({loading} : ChatWebsiteStepProps) => {
    
    const {currentStep} = useChatContextProvider()

    switch(currentStep)
    {
        case 1:
            return(
                <ValidUrlForm />
            )
        case 2:
            return(
                <ChatForm />
            )    
        case 3:
            return(
                <TTSForm />
            )
    }
  
}

export default ChatWebsiteStep