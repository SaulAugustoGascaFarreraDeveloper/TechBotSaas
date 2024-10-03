"use client"
import { Button } from '@/components/ui/button'
import { useValidWebsite } from '@/hooks/chat/use-chat-website'
import React, { ReactNode, useEffect } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'
import {Loader2} from "lucide-react"
import { Input } from '@/components/ui/input'
import { ChatContextProvider, useChatContextProvider } from '@/context/use-chat-website-context'


const UrlInput  = () => {
  const {register} = useFormContext() || {register: () => {}}

  return <Input {...register('url')} />
}


const StepDisplay = () => {
  // Aquí ya puedes llamar a useChatContextProvider
  const { currentStep } = useChatContextProvider();
  return <div>Current Step: {currentStep}</div>;
};

const ValidUrlForm = () => {

  const {methods,loading,onHandleSubmit} = useValidWebsite()

  const {currentStep} = useChatContextProvider()


  switch(currentStep)
  {
      case 2:
        return(
          <h2>YA ESTOY CERCAAA en switch</h2>
        )

  }


  return(
    <FormProvider {...methods} >
        <form onSubmit={onHandleSubmit} className='flex flex-col gap-3' >

        <UrlInput />

          <Button disabled={loading} type='submit' >

              Validate Url
          </Button>

         
          </form> 
      </FormProvider>
  )

}

const ChatWebsiteFormProvider = ({children} : {children: ReactNode}) => {
  
  return (
    <ChatContextProvider>
      
      {children}
        
    </ChatContextProvider>
    

  )
}

export default ChatWebsiteFormProvider