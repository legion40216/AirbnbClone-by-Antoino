"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import Heading from './Heading'
import Button from './Button'

export default function EmptyState({
    title = "No exact match",
    subtitle = "Try changing some of your filters",
    showReset
}) {
    const router = useRouter()
  return (
    <div className='empty-dialbox flow' >
        <Heading 
        title={title}
        subtitle={subtitle}
        center
        />
        <div>
          {showReset && (
            <Button 
             outline
             label="Remove all filters"
             onClick={()=>{router.push('/')}}
            />
          )}
        </div>
    </div>
  )
}
