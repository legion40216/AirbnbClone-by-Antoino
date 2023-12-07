"use client"
import useModalStore from '@/hooks/useModalStore';
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";

import { useState } from "react"

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "./inputs/Input";
import Button from "../Button";

export default function RegisterModal() {
    const modalSwitcher = useModalStore()
    const [isLoading, setIsLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues:{
        name: '',
        email: '',
        password: ''
      }
    });

const onSubmit = async (data) =>{
    setIsLoading(true)
    try {
    const response = await fetch('/api/register/',{
     method: 'POST',
     body: JSON.stringify(data),
     headers: {
       'Content-Type': 'application/json'
     }
    })
    
    if(response.ok)
    {
    toast.success("Account Successfully Created")
    setIsLoading(false)
    modalSwitcher.toggle('login')
    } else {
    setIsLoading(false)
    throw new Error("server failed")
    } 
    }
    catch (error) {
    toast.error("Failed to POST")
    setIsLoading(false)
   }
  }

  const handleToggle = () =>{
    modalSwitcher.toggle('login')
  }
  
  const bodyContent = (
   <>
     <Heading
     title="Welcome To Airbnb"
     subtitle="Create an account"
     />
     <div className="flow" data-spacing="small">
     <Input
     id="email"
     type="email"
     label="Email"
     disabled={isLoading}
     register={register}
     errors={errors}
     placeholder="@gamil"
     required
     />
    <Input
     id="name"
     type="text"
     label="Name"
     disabled={isLoading}
     register={register}
     errors={errors}
     placeholder="Suleman Lohar"
     required
     />
    <Input
     id="password"
     type="password"
     label="Password"
     disabled={isLoading}
     register={register}
     errors={errors}
     placeholder=""
     required
     />
  </div>
 </>
  )

  const footerContent = (
    <div className="grid gap-2 mt-6">
      <Button
      outline
      label="Continue with Google"
      onClick={()=>{}}
      />
      <Button
      outline
      label="Continue with Github"
      onClick={()=>{}}
      />
      <div className="flex justify-center gap-2 mt-4 font-light">
       <p className=" text-neutral-500 cursor-pointer hover:underline">Already have an account?</p>
       <p onClick={handleToggle} className="text-neutral-800 cursor-pointer hover:underline">Log in</p>
      </div>
    </div>
  )

  return (
    <Modal 
    disabled={isLoading}
    modalType = "register"
    modal={modalSwitcher.modalType}
    toggle={modalSwitcher.toggle}
    title="Register"
    actionLabel="Continue"
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
