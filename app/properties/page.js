
import EmptyState from "../components/EmptyState"
import PropertiesClient from "./PropertiesClient"

import getCurrentUser from "../actions/getCurrentUser"
import getListings from "../actions/getListings"


export default async function page() {
  const currentUser = await getCurrentUser()
  if(!currentUser) {
    return(
      
        <EmptyState 
        title='Unauthorized'
        subtitle='Please login'
        />
   
      )
  }

  const listings = await getListings({userId:currentUser.id})

  if(!listings.length === 0) {
    return(
   
        <EmptyState 
        title='No properties found'
        subtitle='Look like you have no properties'
        />
      
      )
  }

  return (
   
    <main className='container-full p-3'>

        <PropertiesClient
        currentUser = {currentUser}
        listings = {listings}
        />
    
    </main>

  )
}
