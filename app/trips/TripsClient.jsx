"use client";
import React, { useCallback, useState } from 'react';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';
import { toast } from "react-hot-toast";

export default function TripsClient({
    reservations,
    currentUser
}) {
    const [deletingId, setDeletingId] = useState('');
    const [reservationState, setReservationState] = useState(reservations);

    const updateReservations = (deletedReservationId) => {
        const newReservations = reservationState.filter((item) => item.id !== deletedReservationId);
        setReservationState(newReservations);
    };

    const onCancel = useCallback(async (id) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/reservations/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                updateReservations(id);
                toast.success('Reservation cancelled');
            }
        } catch (error) {
            toast.error(error?.response?.data?.error);
        } finally {
            setDeletingId('');
        }
    }, []);

    return (
        <div className='grid-flow'>
            <Heading
                title="Trips"
                subtitle="Where you've been and where you are going"
            />
            <div className='multiple-grid gap-4'>
                {reservationState.map((reservation) => (
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