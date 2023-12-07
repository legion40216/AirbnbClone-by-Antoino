'use client'
import React from 'react'

export default function ListingCategory({
    description,
    icon: Icon,
    label,
}) {
  return (
    <div className='flex items-center gap-2'>
        <Icon size={40}  className=' text-neutral-600'/>
        <div>
            <p className='text-lg font-semibold'>
            {label}
            </p>
            <p className=' text-neutral-500 font-light'>
            {description}
            </p>
        </div>
    </div>
  )
}
