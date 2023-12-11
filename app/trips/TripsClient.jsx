"use client";
import React, { useCallback, useState } from 'react';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { toast } from "react-hot-toast";
import { useRouter } from 'next/navigation';

export default function TripsClient({
    reservations,
    currentUser
}) {
    const router = useRouter()
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback(async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/reservations/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                router.refresh()

                toast.success('Reservation cancelled');
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        } finally {
            setDeletingId('');
        }
    }, [router]);

    return (
        <div className='grid-flow'>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you are going"
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
                        actionLabel="Cancel reservation"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </div>
    );
}