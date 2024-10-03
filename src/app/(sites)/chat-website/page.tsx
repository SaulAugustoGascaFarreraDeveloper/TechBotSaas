
import { onValidUrlWebsite } from '@/actions/chat-website'
import ButtonHandler from '@/components/form/chat-website/button-handler'
import ChatWebsiteStep from '@/components/form/chat-website/chat-website-step'
import ChatWebsiteFormProvider from '@/components/form/chat-website/form-provider'
import { Button } from '@/components/ui/button'
import { useChatContextProvider } from '@/context/use-chat-website-context'
import React, { useState } from 'react'

const ChatWebsitePage = () => {


  return (
    <div className="flex px-4 mt-8 lg:px-8">
        <ChatWebsiteFormProvider>
              <ChatWebsiteStep />
        </ChatWebsiteFormProvider>
        
          
    </div>
  )
}

export default ChatWebsitePage