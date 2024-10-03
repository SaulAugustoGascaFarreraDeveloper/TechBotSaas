"use client"

import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"


type InitialValuesProps = {
    currentStep: number
    setCurrentStep: Dispatch<SetStateAction<number>>
}

const InitialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => undefined
}


const chatContext = createContext(InitialValues)

const {Provider} = chatContext


export const ChatContextProvider = ({children}: {children:ReactNode}) => {

    const [currentStep,setCurrentStep] = useState<number>(InitialValues.currentStep)

    const values = {currentStep,setCurrentStep}

    return <Provider value={values} >
        {children}
    </Provider>


}


export const useChatContextProvider = () => {

    const state = useContext(chatContext)

    if (!state) {
        throw new Error("useChatContextProvider must be used within a ChatContextProvider");
    }

    return state

}