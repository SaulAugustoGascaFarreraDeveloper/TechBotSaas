"use server"
import {OpenAI} from 'openai'
import fs from "fs"
import path from 'path';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY as string
})

const speechFile = path.resolve("./speech.mp3");

export const onTTS = async (content: string) =>{

    
   

    try{

        const response = await openai.audio.speech.create({
            model: 'tts-1',
            voice: 'onyx',
            input: content
        })

       

        if(response)
        {
            //console.log("AUDIO ACTION --> ",response.text)

            const buffer = Buffer.from(await response.arrayBuffer())


            await fs.promises.writeFile(speechFile,buffer)
            
            return {status: 200,message: "Audio created Succesfully !!"}


        }


        return {status: 404,message: "Audio Creation Failed !!"}

    }catch(error){
        console.log("On TTS Error --> ",error)
    }

}