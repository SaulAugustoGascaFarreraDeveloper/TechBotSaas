"use client"
import React from 'react'
import TypewriterComponent from 'typewriter-effect';

const TypeEffect = () => {
  return (
    <TypewriterComponent 
         onInit={(typewriter) => { 
          typewriter.typeString('SaaS developed to chat with website and PDF files !!') 
            .callFunction(() => { 
              console.log('String typed out!'); 
            }) 
            .pauseFor(500) 
            .deleteAll() 
            .callFunction(() => { 
              console.log('All strings were deleted'); 
            }) 
            .start()
             
        }} 
        />
  )
}

export default TypeEffect