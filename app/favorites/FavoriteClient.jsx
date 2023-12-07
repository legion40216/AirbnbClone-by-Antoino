import React from 'react'
import Heading from '../components/Heading'
import ListingCard from '../components/listings/ListingCard'

export default function FavoriteClient({
    currentUser,
    listings
}) {
  return (
    <div className='grid-flow'>
        <Heading 
        title="Favorites"
        subtitle="List of places you have favorited"
        />
        <div className='multiple-grid gap-4'>
        {listings.map((listing) => (
            <ListingCard
                currentUser={currentUser}
                key={listing.id}
                data={listing}
            />
        ))}
    </div>
    </div>
  )
}
