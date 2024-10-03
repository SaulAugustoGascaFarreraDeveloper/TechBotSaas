"use client"
import { Button } from '@/components/ui/button'
import { useChatContextProvider } from '@/context/use-chat-website-context'
import { useGenerateAudioContent } from '@/hooks/chat/use-chat-website'
import { getAllResponse } from '@/lib/indexedDB'
import { Loader2 } from 'lucide-react'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FormProvider, useFormContext } from 'react-hook-form'



type ContentTextareaProps = {
  content: string
  setContent: Dispatch<SetStateAction<string>>
}

const ContentTextarea = ({content,setContent} : ContentTextareaProps) => {

  const {register} = useFormContext()


  return(
    <textarea
    className='w-full relative h-auto ' 
    {...register('content')}
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />
  )
}


const TextToSpeechForm = () => {

  const [content,setContent] = useState<string>("")

  const {currentStep} = useChatContextProvider()

  const {loading,onHandleSubmit,methods} = useGenerateAudioContent()

  const handleGetData = async () => {
    const array = await getAllResponse()

    // Recorre el array y formatea los mensajes
    const formattedData = array.map((item: any) => {
      return `Message: ${item.message}\nRole: ${item.role}\nTimestamp: ${new Date(item.timestamp).toLocaleString()}`;
  }).join("\n\n");  // Une todos los mensajes separados por doble salto de línea

  console.log("Formatted Data:\n", formattedData);

      setContent(formattedData)
  }

 

  useEffect(() =>{
    if(currentStep == 3)
      {
        handleGetData()
      }
  },[currentStep])


  return (
    <FormProvider {...methods}>

      <form onSubmit={onHandleSubmit} className='w-full flex flex-col gap-4'>

              <div className="flex flex-col gap-4 items-center w-full p-8">
                {content && (
                 <ContentTextarea content={content} setContent={setContent} />
                )}
             </div>

             <Button type='submit' disabled={loading} className='rounded-md' >
                {loading ? <Loader2 className='animate-spin' size={20} /> : "Crear Audio"}
             </Button>

      </form>

    

    </FormProvider>
    
  )
}

export default TextToSpeechForm