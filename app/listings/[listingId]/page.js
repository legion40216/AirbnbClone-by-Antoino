import getCurrentUser from '@/app/actions/getCurrentUser'
import getListingById from '@/app/actions/getListingById'
import getReservations from '@/app/actions/getReservation'


import EmptyState from '@/app/components/EmptyState'
import ListingClient from '@/app/listings/[listingId]/ListingClient'

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
    <ListingClient
     listing={listing}
     reservations={reservations}
     currentUser={currentUser}
     />
    </main>

  )
}
