import { Button } from '@/components/ui/button'
import { useChatContextProvider } from '@/context/use-chat-website-context'
import { useChatWebsite } from '@/hooks/chat/use-chat-website'
import { Loader2 } from 'lucide-react'
import React from 'react'

const ButtonHandler = () => {

    const {currentStep,setCurrentStep} = useChatContextProvider()

    const {loading} = useChatWebsite()


    if(currentStep == 2)
    {
        return <Button>
            Otro Boton 2
        </Button>
    }



  return (

    <Button disabled={loading} type='submit' >
        {loading ? <Loader2 size={20} className='animate-spin' /> : "Validar Url 2"}
    </Button>

  )
}

export default ButtonHandler