"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatContextProvider } from "@/context/use-chat-website-context"
import { useValidWebsite } from "@/hooks/chat/use-chat-website"
import { deleteData } from "@/lib/indexedDB"
import { useEffect } from "react"
import { FormProvider, useFormContext } from "react-hook-form"

const UrlInput  = () => {
    const {register} = useFormContext() || {register: () => {}}
  
    return <Input {...register('url')} />
  }
  

export const ValidUrlForm = () => {

    const {methods,loading,onHandleSubmit} = useValidWebsite()
  

    const {currentStep} = useChatContextProvider()

    const handleDeleteDateStore = async () => {
      await deleteData()
    }

    if(currentStep == 1)
    {
      handleDeleteDateStore()
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
