"use client"
import React, { useCallback } from 'react'
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

export default function Counter({
   title,
   subtitle,
   value,
   onChange
}) {
    const onAdd = useCallback(()=>{
      onChange(value + 1)
    },[onChange, value])

    const onReduce = useCallback(()=>{
    if (value === 1) {
        return
    }
    onChange(value - 1)
    }, [value, onChange])
    
  return (
    <div className="flex item-center justify-between">
      <div className='flex flex-col'>
        <p className='font-medium'>
          {title}
        </p>
        <p className='font-light text-gray-600'>
          {subtitle}
        </p>
      </div>
      <div className='flex items-center justify-center gap-3'>
        <button className='counter-btn' onClick={onReduce}>
        <AiOutlineMinus />
        </button>
        <div className="font-light text-xltext-neutral-600">
            {value}
        </div>
        <button className='counter-btn' onClick={onAdd}>
        <AiOutlinePlus />
        </button>
      </div>
    </div>
  )
}
