"use client"
import Image from 'next/image'
import React, { useCallback, useMemo } from 'react'
import { useRouter } from "next/navigation";
import useCountries from '@/hooks/useCountries'
import { format } from 'date-fns';

import HeartButton from '../HeartButton'
import Button from '../Button'

export default function ListingCard({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId,
    currentUser
}) {

    const { getByValue } = useCountries()
    const router = useRouter();
    const location = getByValue(data.locationValue)

    const handleCancel = useCallback((e) => {
        e.stopPropagation();
    
        if (disabled) {
          return;
        }
    
        onAction?.(actionId)
      }, [disabled, onAction, actionId]);

      const price = useMemo(() => {
        if (reservation) {
          return reservation.totalPrice;
        }
    
        return data.price;
      }, [reservation, data.price]);

      const reservationDate = useMemo(() => {
        if (!reservation) {
          return null;
      }
      
        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);
    
        return `${format(start, 'PP')} - ${format(end, 'PP')}`;
      }, [reservation]);

  return (
    <div>
      <div className="listing-card relative group cursor-pointer" 
      onClick={() => router.push(`/listings/${data.id}`)}>
        <Image
            fill
            className="
              object-cover 
              h-full 
              w-full 
              group-hover:scale-110 
              transition
            "
            src={data.imageSrc}
            alt="Listing"
          />
          <div className="
            absolute
            top-3
            right-3">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
      </div>
      
          <div>
            <p className='font-semibold text-lg'>
              <span className='text-neutral-600'>{location.region}, </span>
                {location.label}
              </p>
              <p className='font-light text-neutral-500'>
              {reservationDate || data.category}
              </p>
          </div>
    
          <div className='flex flex-col gap-1'>
            <div className='flex gap-1'>
              <p className='font-semibold'>
                $ {price}
              </p>
              {!reservation && (
              <p className='font-light'>night</p>
              )}
            </div>
            {reservation && (
              <p className=' font-semibold'>
              <span className=' font-light'>Reserved by: </span>
              {reservation.user.name}
              </p>
            )}
            {onAction && actionLabel && (
              <Button 
              disabled={disabled}
              small
              label={actionLabel}
              onClick={handleCancel}
              />
            )}
          </div>
    </div>
  )
}
