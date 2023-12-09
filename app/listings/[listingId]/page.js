import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservation'
import ListingHead from '@/app/components/listings/ListingHead'
import EmptyState from '@/app/components/EmptyState'
import ListingClient from '@/app/listings/[listingId]/ListingClient'
import { Suspense } from 'react'

export default async function page({params}) {
  const listing = await getListingById({params})
  const reservations = await getReservations({params})
  const currentUser = await getCurrentUser()


  if(!listing || listing.length === 0 )
  {
    return (
      <EmptyState subtitle={"Listing not found"}/>
    )
  }

  return (

    <main className='container-full p-3'>
       <div className='grid-flow '>
        <ListingHead 
        title={listing.title}
        imageSrc={listing.imageSrc}
        locationValue={listing.locationValue}
        listingId={listing.id}
        currentUser={currentUser}
        />
        <Suspense>
        <ListingClient
          listing={listing}
          reservations={reservations}
          currentUser={currentUser}
          />
        </Suspense>
       </div>
    </main>

  )
}
