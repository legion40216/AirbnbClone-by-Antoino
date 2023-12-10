"use client"
import { useCallback, useState } from 'react'
import useModalStore from '@/hooks/useModalStore'
import { Bars4Icon } from '@heroicons/react/24/outline'

import Menuitem from './MenuItem'
import Avatar from '../Avatar'
import { useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'

export default function UserMenu ({status}) {
  
  const router = useRouter()
  const modalSwitcher = useModalStore()
  const [isOpen, setIsOpen] = useState(false)
  
  const onRent = useCallback(()=>{
    if(status === "unauthenticated"){
      return modalSwitcher.toggle('login') 
    }
    modalSwitcher.toggle('rent')
  },[modalSwitcher,status])

  return (
    <div className="relative">
      <div className="flex items-center gap-3">

        <button onClick={onRent}
          className = "hidden md:block hover:bg-neutral-100 transition border-[1px]"
          data-type = "nav-button">
          Airbnb your home
        </button>

        <div className='flex gap-3 items-center'>
          <button className="hamburger-menu" onClick={()=>{setIsOpen(!isOpen)}}>
          <Bars4Icon  width={18}/>
          </button>

          <div className='hidden md:block'>
          <Avatar/>
          </div>
        </div>
      </div>
      {isOpen && (
        <nav className='nav-menu'>
          <ul className='flex flex-col'>
          { !(status === "unauthenticated") ? (
          <>
            <Menuitem
            onClick={()=> {
                router.push('/trips')
                setIsOpen(!isOpen)
              }}
            label= "My trips"
           /> 

          <Menuitem
            onClick={()=> {
              router.push('/favorites')
              setIsOpen(!isOpen)
            }}
            label= "My favorites"
           />

            <Menuitem
            onClick={()=> {
              router.push('/reservations')
              setIsOpen(!isOpen)
            }}
            label= "My reservations"
           />

           <Menuitem
            onClick={()=> {
              router.push('/properties')
              setIsOpen(!isOpen)
            }}
            label= "My properties"
           />

           <Menuitem
            onClick={()=> {
              modalSwitcher.toggle('rent')
              setIsOpen(!isOpen)
            }}
            label= "Airbnb my home"
           />

           <Menuitem
            onClick={()=> {
              signOut()
              setIsOpen(!isOpen)
            }}
            label= "Logout"
           />
          </>
          ) : (
          <>
           <Menuitem
            onClick={()=> {
                modalSwitcher.toggle('login') 
                setIsOpen(!isOpen)
              }}
            label= "Login"
           /> 
            <Menuitem
            onClick={()=> {
              modalSwitcher.toggle('register') 
              setIsOpen(!isOpen)
            }}
            label= "Sign Up"
           />
           </>
           )}
          </ul>
        </nav>
      ) }
    </div>
  )
}
