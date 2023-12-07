"use client"

import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from "react-hot-toast";

export default function ReservationClient({
  currentUser,
  reservations
}) {

  const route = useRouter()
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(async (id) => {
    setDeletingId(id);
    try {
        const response = await fetch(`/api/reservations/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            route.refresh()
            toast.success('Reservation cancelled');
        }
    } catch (error) {
        toast.error(error?.response?.data?.error);
    } finally {
        setDeletingId('');
    }
}, [route]);

  return (
    <div className='grid-flow'>
    <Heading
        title="Reservation"
        subtitle="Booking on your property"
    />
    <div className='multiple-grid gap-4'>
        {reservations.map((reservation) => (
            <ListingCard
                key={reservation.id}
                data={reservation.listing}
                reservation={reservation}
                actionId={reservation.id}
                onAction={onCancel}
                disabled={deletingId === reservation.id}
                actionLabel="Cancel guest reservation"
                currentUser={currentUser}
            />
        ))}
    </div>
</div>
  )
}
