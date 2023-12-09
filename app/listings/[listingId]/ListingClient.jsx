"use client"

import ListingReservation from '@/app/components/listings/ListingReservation'
import ListingInfo from '@/app/components/listings/ListingInfo'
import { categories } from '@/app/components/navbar/Categories'

import useModalStore from '@/hooks/useModalStore'
import { toast } from "react-hot-toast";
import { differenceInDays, eachDayOfInterval } from 'date-fns'

import React, { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection'
};

export default function ListingClient({
  listing, 
  currentUser, 
  reservations = []
}) {

  const loginModal = useModalStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState(initialDateRange);

  const category = categories.find((item) => {
    return item.label === listing.category
  })
 
  const disabledDates = useMemo(() => {
    let dates = []

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate)
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const onCreateReservation = async () => {
    if (!currentUser) {
      return loginModal.toggle("login");
    }
    setIsLoading(true);

    try {
      const response = await fetch('/api/reservations',{
       method: 'POST',
       body: JSON.stringify({
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id
       }),
       headers: {
         'Content-Type': 'application/json'
       }
      })

      if(response.ok)
      {
        toast.success('Listing reserved!');
        setDateRange(initialDateRange);
        router.refresh();
      } else {
      throw new Error("server failed")
      } 
      }
      catch (error) {
      toast.error('Something went wrong.');
     }
     finally {
      setIsLoading(false);
     }
   }

useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(
        dateRange.endDate, 
        dateRange.startDate
      );
      
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  return (
    <div className='
    grid-flow
    grid 
    grid-cols-1 
    md:grid-cols-2 
    md:gap-10 '
    >
    <ListingInfo    
    user={listing.user}
    category={category}
    description={listing.description}
    roomCount={listing.roomCount}
    guestCount={listing.guestCount}
    bathroomCount={listing.bathroomCount}
    locationValue={listing.locationValue}
    />
    <ListingReservation
    price={listing.price}
    totalPrice={totalPrice}
    onChangeDate={(value) => setDateRange(value)}
    dateRange={dateRange}
    onSubmit={onCreateReservation}
    disabled={isLoading}
    disabledDates={disabledDates}
    />
    </div>
  )
}
