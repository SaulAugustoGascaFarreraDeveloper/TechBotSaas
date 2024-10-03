import { NextResponse } from "next/server"
import axios from "axios"

export const GET = async (req: Request) => {

    const response = await axios.get("https://webscraping-fastapi-backend.onrender.com")

    const {data} = await response

    return NextResponse.json({message: data})
}