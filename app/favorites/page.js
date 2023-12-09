import getCurrentUser from '@/app/actions/getCurrentUser'
import getFavoritesListing from '../actions/getFavoritesListing'

import EmptyState from '@/app/components/EmptyState'
import FavoriteClient from './FavoriteClient'
export const revalidate = 0
export default async function page () {
    const listings =  await getFavoritesListing()
    const currentUser = await getCurrentUser()
   
     if(listings.length === 0 ) {
      return (
        <EmptyState 
        title='No favorites found'
        subtitle="Look like you have no favorite listing"
        />
      )
    }
  
  return (
   
    <main className='container-full p-3'>
    <FavoriteClient
    listings = {listings}
    currentUser = {currentUser}
    />
    </main>

    
  )
}
