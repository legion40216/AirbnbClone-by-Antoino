
import getCurrentUser from "./actions/getCurrentUser"
import getListings from "./actions/getListings"
import EmptyState from "./components/EmptyState"
import ListingCard from "./components/listings/ListingCard"

export default async function Home(searchParams) {

  const listings = await getListings(searchParams) 
  const currentUser = await getCurrentUser()

  if(!listings || listings.length === 0 )
  {
    return (
      <EmptyState showReset />
    )
  }

  return (
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
  )
}
