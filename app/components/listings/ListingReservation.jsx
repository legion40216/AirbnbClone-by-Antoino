"use client"
import React from 'react'
import CalanderInput from '../Modals/inputs/CalanderInput'
import Button from '../Button'

export default function ListingReservation({
    price,
    totalPrice,
    onChangeDate,
    dateRange,
    onSubmit,
    disabled,
    disabledDates,    
}) {
  return (
    <div className='listing-reservation-wrapper flow-padding-bottom'>
      <div className='p-4 border-b-[1px]'>
       <p className='flex items-center gap-1'>
        <span className=' text-2xl font-semibold'>
          $ {price} 
        </span>
         <span className=' block font-light text-neutral-600'>
          night
         </span>
        </p>
      </div>
      <CalanderInput 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <div className='p-3'>
        <Button 
        disabled={disabled}
        label="Reserve"
        onClick={onSubmit}
        />
      </div>
      <div className='p-4 
      flex 
      justify-between 
      item-center 
      font-semibold 
      text-lg'>
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </div>
    </div>
  )
}
