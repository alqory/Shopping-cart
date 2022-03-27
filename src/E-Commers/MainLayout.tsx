import {BsFillCartCheckFill} from 'react-icons/bs'
import React, { useState } from 'react'
import Cart from './Cart'
import { useStoreContext } from './Context/Store-reducer';

type Props = { children : React.ReactNode }

const Layout = ({children}: Props) => {
    const [isOpen, setOpen] = useState<boolean>(false) 
    const {state} = useStoreContext();

    return(
        <div>
            <div id="navbar" className="fixed left-0 right-0 top-0 flex justify-evenly items-center p-4 bg-teal-900 text-lg text-white z-10">
                <span className="font-light">Alqory Shop</span>
                <div onClick={()=> setOpen(prev => !prev)} className='flex justify-center items-center cursor-pointer'>
                    <span className='text-2xl' ><BsFillCartCheckFill /></span>
                    <span className='flex justify-center items-center bg-white text-red-700 rounded-full h-5 w-5 text-xs font-bold -translate-y-2'>{state.Carts.length}</span>
                </div>
            </div>
            <div id="body" onClick={()=> setOpen(prev => false)} className='w-11/12 mx-auto mt-16 flex  flex-wrap'>{children}</div>
            {
                isOpen && 
                <Cart />
            } 
        </div>
    )
}

export default Layout;

