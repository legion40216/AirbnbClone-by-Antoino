import getCurrentUser from "./actions/getCurrentUser"
import getListings from "./actions/getListings"
import ClientOnly from "./components/ClientOnly"
import EmptyState from "./components/EmptyState"
import ListingCard from "./components/listings/ListingCard"
export const dynamic = 'force-dynamic'
export default async function Home({searchParams}) {

  const listings = await getListings(searchParams) 
  const currentUser = await getCurrentUser()

  if(!listings || listings.length === 0 )
  {
    return (
      <ClientOnly>
      <EmptyState showReset />
      </ClientOnly>
    )
  }

  return (
    <ClientOnly>
    <main className="container-full">
      <div className="
      multiple-grid
      p-3
      gap-4 
      ">
        {
          listings.map((listing) => ( 
            <ListingCard 
            currentUser={currentUser}
            key={listing.id} 
            data={listing}/>
          ))
        }
      </div>
    </main>
    </ClientOnly>
  )
}
