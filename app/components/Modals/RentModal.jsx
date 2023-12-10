"use client"
import useModalStore from "@/hooks/useModalStore";

import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "./inputs/CategoryInput";

import CountrySelect from "./inputs/CountrySelect";
import Counter from "./inputs/Counter";
import ImageUpload from "./inputs/ImageUpload";
import Inputs from "./inputs/Input";

import { useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { categories } from "@/app/constants/categoryIcons";


const STEPS = Object.freeze({
  CATEGORY: 0,
  LOCATION: 1,
  INFO: 2,
  IMAGES: 3,
  DESCRIPTION: 4,
  PRICE: 5,
});

export default function RentModal() {
  const router = useRouter()
  const modalSwitcher = useModalStore()
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const handleNavigation = (direction) => {
        setStep((prevStep)=>{
        const nextStep = prevStep + direction
        if(direction > prevStep)
        {
          return direction
        }
        if(nextStep >= 0 && nextStep < Object.keys(STEPS).length){
          return nextStep
        }
        return prevStep
      })
  }

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return 'Create'
    }

    return 'Next'
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return null
    }

    return 'Back'
  }, [step]);

  const { 
    register, 
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      category: 'Beach',
      location: '',
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imageSrc: '',
      price: 100,
      title: '',
      description: '',
    }
  });

  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  const category = watch('category');
  const location = watch('location');
  const guestCount = watch('guestCount');
  const roomCount = watch('roomCount');
  const bathroomCount = watch('bathroomCount');
  const imageSrc = watch('imageSrc');


  const onSubmit = async (data) => {
    if(step !== STEPS.PRICE)
    {
     return handleNavigation(1)
    }
    try {
      setIsLoading(true);
      const response = await fetch('/api/listing/',{
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
       })

      if (response.ok) {
        router.refresh()
        toast.success('Lisiting Created!');
        setStep(STEPS.CATEGORY)
        reset()
        modalSwitcher.toggle(null)

      } else {
        throw new Error("Server failed");
      }
    } catch (error) {
      toast.error("Failed to submit");
    } finally {
      setIsLoading(false);
    }
  }

  let bodyContent =  (
    <div className="grid grid-flow" data-spacing="large">
    <Heading
      title="Which of these best describes your place?"
      subtitle="Pick a category"
    />
    <form className="modal-categories">
      {
        categories.map((items,index)=>(
         <div key={index}>
          <CategoryInput 
          label={items.label}
          icon={items.icon}
          selected={category === items.label}
          register={register}
          />
         </div>
        ))
      }
    </form>
    </div>
  )

  if(step === STEPS.LOCATION)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading
      title="Where is your place located ?"
      subtitle="Help us find you"
    />
    <CountrySelect 
      value={location} 
      onChange={(value) => setCustomValue('location', value)} 
    />
      </div>
    )
  }

  if(step === STEPS.INFO)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading 
      title="Share some basics about your place"
      subtitle="What amentites do you have"
      />
        <div className="flow"  data-spacing="large">
        <Counter 
        title="Guest"
        subtitle="How many guests do you allow?"
        value={guestCount}
        onChange={(value) => setCustomValue('guestCount', value)}
        />
        <Counter 
        title="Rooms"
        subtitle="How many rooms do you have?"
        value={roomCount}
        onChange={(value) => setCustomValue('roomCount', value)}
        />
        <Counter 
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={(value) => setCustomValue('bathroomCount', value)}
        />
        </div>
      </div>
    )
  }
  
  if(step === STEPS.IMAGES)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading 
      title="Share some basics about your place"
      subtitle="What amentites do you have"
      />
      <ImageUpload 
      value={imageSrc} 
      onChange={(value) => setCustomValue('imageSrc',value)}/>
      </div>
    )
  }

  if(step === STEPS.DESCRIPTION)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading 
      title="How would you describe your place?"
      subtitle="Short and sweet works best!"
      />
      <div className="flow" data-spacing="small">
      <Inputs 
      id="title"
      label="Title"
      register={register}
      errors={errors}
      disabled={isLoading}
      required
      />
      <Inputs 
      id="description"
      label="Description"
      register={register}
      errors={errors}
      disabled={isLoading}
      required
      />
      </div>
      </div>
    )
  }

  if(step === STEPS.PRICE)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading 
      title="Now set your price"
      subtitle="How much do you charge per night?"
      />
      <div className="flow" data-spacing="small">
      <Inputs 
      id="price"
      label="Price"
      type="number"
      register={register}
      errors={errors}
      disabled={isLoading}
      required
      formatPrice
      />
      </div>
      </div>
    )
  }

  return (
   <Modal
    modalType = 'rent'
    modal={modalSwitcher.modalType}
    toggle={modalSwitcher.toggle}
    title="Airbnb your home"
    body={bodyContent}
    actionLabel= {actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={step === STEPS.CATEGORY ? undefined : ()=>{handleNavigation(-1)} }
    onSubmit={handleSubmit(onSubmit)}
   />
  )
}
