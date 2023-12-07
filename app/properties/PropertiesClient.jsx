"use client"

import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react'
import { toast } from "react-hot-toast";



export default function PropertiesClient({
  currentUser,
  listings
}) {
  const route = useRouter()
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(async (id) => {
    setDeletingId(id);
    try {
        const response = await fetch(`/api/listing/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            route.refresh()
            toast.success('Listing deleted');
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
        title="Properties"
        subtitle="List of your properties"
    />
    <div className='multiple-grid gap-4'>
        {listings.map((listing) => (
            <ListingCard
                key={listing.id}
                data={listing}
                actionId={listing.id}
                onAction={onCancel}
                disabled={deletingId === listing.id}
                actionLabel="Delete properties"
                currentUser={currentUser}
            />
        ))}
    </div>
</div>
  )
}
