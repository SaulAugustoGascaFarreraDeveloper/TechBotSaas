import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <div className="flex gap-5 items-center justify-between px-7 py-5 font-bold border-b border-solid border-zinc-900 max-md:flex-wrap max-md:px-5">
        <Link
                href={'/'}
                className='hover:cursor-pointer hover:border-b-4 hover:border-r-4 border-black hover:-translate-y-1 rounded-sm'
        >
                        <h2 className="font-bold text-4xl text-slate-950 px-2" >Tech Bot</h2>
        </Link>

        <div className='flex items-center gap-7'>
              
                
                    <Link
                        href={'/chat-website'}
                        className='hover:cursor-pointer  hover:border-b-2 border-black'
                    >
                        <h2 className="font-bold text-2xl text-slate-950" >Chat Website</h2>
                    </Link>

                    <Link
                        href={'/chat-pdf'}
                        className='hover:cursor-pointer  hover:border-b-2 border-black'
                    >
                        <h2 className="font-bold text-2xl text-slate-950" >Chat PDF</h2>
                    </Link>
        </div>
           
        
       
       
    </div>
  )
}

export default Navbar