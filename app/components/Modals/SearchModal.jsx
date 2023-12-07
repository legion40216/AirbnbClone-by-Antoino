"use client"

import qs from "query-string"
import React, { useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { formatISO } from "date-fns"

import CalanderInput from "./inputs/CalanderInput"
import CountrySelect from "./inputs/CountrySelect"
import useModalStore from '@/hooks/useModalStore'
import Modal from './Modal'
import Heading from "../Heading"
import Counter from "./inputs/Counter"

const STEPS = Object.freeze({

  LOCATION: 0,
  DATE: 1,
  INFO: 2,
  
});

export default function SearchModal() {
    const router = useRouter()
    const params = useParams()
    const modalSwitcher = useModalStore()

    const [step, setStep]                   = useState(STEPS.LOCATION);
    const [location, setLocation]           = useState();
    const [guestCount, setGuestCount]       = useState(1);
    const [roomCount, setRoomCount]         = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange]         = useState({
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    });

     const handleNavigation = (direction) => {
        setStep((prevStep)=>{
        if(direction > prevStep)
        {
          return direction
        }
        const nextStep = prevStep + direction
        if(nextStep >= 0 && nextStep < Object.keys(STEPS).length){
          return nextStep
        }
        return prevStep
      })
  }

  const onSubmit = async () => {
    if(step !== STEPS.INFO) {
     return handleNavigation(1)
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString())
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl({
      url: '/',
      query: updatedQuery,
    }, { skipNull: true });

    setStep(STEPS.LOCATION);
    modalSwitcher.toggle('null');
    router.push(url);
  }

  const actionLabel = useMemo(()=>{
  if(step === STEPS.INFO) {
     return 'Search'
  }
  return 'Next'
  },[step])

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined
    }

    return 'Back'
  }, [step]);


  let bodyContent = (
    <div className="grid grid-flow" data-spacing="large">
    <Heading
      title="Where do you want to go?"
      subtitle="Find the perfect loction"
    />
    <CountrySelect
      value={location} 
      onChange={(value) => setLocation(value)} 
    />
    </div>
  )

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <CalanderInput
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    )
  }

  if(step === STEPS.INFO)
  {
    bodyContent = (
      <div className="grid grid-flow" data-spacing="large">
      <Heading 
      title="More information"
      subtitle="Find your perfect place!"
      />
        <div className="flow"  data-spacing="large">
        <Counter 
        title="Guest"
        subtitle="How many guests are coming?"
        value={guestCount}
        onChange={(value) => setGuestCount(value)}
        />
        <Counter 
        title="Rooms"
        subtitle="How many rooms do you have?"
        value={roomCount}
        onChange={(value) => setRoomCount(value)}
        />
        <Counter 
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
        value={bathroomCount}
        onChange={(value) => setBathroomCount(value)}
        />
        </div>
      </div>
    )
  }
  return (
    <Modal
    modalType = 'search'
    modal={modalSwitcher.modalType}
    toggle={modalSwitcher.toggle}
    body={bodyContent}
    onSubmit={onSubmit}
    title="Filter"
    actionLabel={actionLabel}
    secondaryActionLabel={secondaryActionLabel}
    secondaryAction={()=>{step === secondaryActionLabel ? undefined : handleNavigation(-1)}}
    />
  )
}
