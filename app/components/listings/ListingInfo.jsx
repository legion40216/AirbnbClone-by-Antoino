'use client'
import React from 'react'
import Avatar from '../Avatar'
import ListingCategory from './ListingCategory'

export default function ListingInfo({
    user,   
    category,
    description,
    roomCount,
    guestCount,
    bathroomCount,
}) {

  return (
    <div className='flow-padding-bottom flow-padding-top'>
        <div>
        <div className='
            text-xl 
            font-semibold 
            flex 
            gap-2 
            items-center'>
            <p>Hosted by {user?.name}</p>
            <Avatar scr={user?.image}/>
        </div>

        <div className='
            font-light 
            text-neutral-500 
            flex 
            gap-2'>
            <p>{guestCount} guests</p>
            <p>{roomCount} rooms</p>
            <p>{bathroomCount} bathrooms</p>
        </div>
        </div>
        {category && ( 
            <ListingCategory 
            description={category.description}
            icon={category.icon}
            label={category.label}
            />
        )}
        <div className='
            font-light 
            text-neutral-500'
            >
            {description}
        </div>
    </div>
  )
}
