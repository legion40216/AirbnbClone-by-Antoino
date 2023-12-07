"use client"
import useCountries from '@/hooks/useCountries'
import React from 'react'
import Heading from '../Heading'
import Image from 'next/image'
import HeartButton from '../HeartButton'

export default function ListingHead({
    title,
    imageSrc,
    locationValue,
    listingId,
    currentUser,
}) {
    const {getByValue} = useCountries()
    const location = getByValue(locationValue)

  return (
<div className='grid-flow'>

    <Heading 
    title={title}
    subtitle={`${location?.region}, ${location?.label}`}
    />

    <div className='listing-head-img'>
        <Image
            fill
            src={imageSrc}
            alt="Image"
            className="
            object-cover 
            w-full"
        />
        <div className="
        absolute
        top-3
        right-3">
        <HeartButton 
        listingId={listingId}
        currentUser={currentUser}
        />
        </div>
    </div>
</div>
  )
}
