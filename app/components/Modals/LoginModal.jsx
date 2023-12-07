"use client"
import { useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react"

import { useRouter } from 'next/navigation'
import { useState } from "react"

import useModalStore from '@/hooks/useModalStore';

import Modal from "./Modal"
import Heading from "../Heading"
import Input from "./inputs/Input";
import Button from "../Button";

export default function LoginModal() {
    const modalSwitcher = useModalStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues:{
        email: '',
        password: ''
      }
    });

const onSubmit = async (data) => {
  try {
    setIsLoading(true);

    const response = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (response.ok) {
      router.refresh()
      toast.success('Logged in');
      modalSwitcher.toggle(null)
    } else {
      throw new Error("Server failed");
    }
  } catch (error) {
    toast.error("Failed to log in");
  } finally {
    setIsLoading(false);
  }
  }
  
  const handleToggle = () => {
    modalSwitcher.toggle('register') 
  }

  const bodyContent = (
   <>
     <Heading
     title="Welcome Back"
     subtitle="Login to your account!"
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
       <p className=" text-neutral-500 cursor-pointer hover:underline">First time using Airbnb?</p>
       <p onClick={handleToggle} className="text-neutral-800 cursor-pointer hover:underline">Create an account</p>
      </div>
    </div>
  )

  return (
    <Modal 
    disabled={isLoading}
    modalType = "login"
    modal={modalSwitcher.modalType}
    toggle={modalSwitcher.toggle}
    title="Login"
    actionLabel="Continue"
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  )
}
