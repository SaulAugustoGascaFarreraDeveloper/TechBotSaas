"use server"
import axios from "axios"
import { url } from "inspector"

export const onValidUrlWebsite = async (url: string) => {

    try{

        const response = await axios.post("http://localhost:8000/api/scrape",{
            url: url
        })

        

        if(response.data)
        {
            console.log(response.data)
            return {status: 200,message: "Valid url you can chat now !!"}
        }

        return {status: 404,message: "Invalid URL try again !!"}

    }catch(error)
    {
        console.log("On Valid Url Website Error --> ",error)
    }


}


export const onChatWithWebsite = async (message: string) => {
    
    try{

        const response = await axios.post('http://localhost:8000/api/chat',{
            message: message
        })

        //console.log("afuerad --> ",response)
        
        if(response.data)
        {
            //console.log(response.data)

            return {status: 200,message: response.data}
        }

        return {status: 404,message: "Invalid URL try again !!"}

    }catch(error)
    {
        console.log("On Chat Website Error --> ",error)
    }

}