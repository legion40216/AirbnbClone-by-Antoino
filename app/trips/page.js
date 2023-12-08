import React from 'react'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservation'

import EmptyState from '../components/EmptyState'
import TripsClient from './TripsClient'

export default async function page ()  {
  const currentUser = await getCurrentUser()
  if(!currentUser) {
    return(
      <EmptyState 
      title='Unauthorized'
      subtitle='Please login'
      />
    ) 
  }

  const reservations = await getReservations({params:{userId: currentUser.id}})

  if(!reservations || reservations.length === 0) {
    return (
      <EmptyState 
      title='No trips found'
      subtitle='Looks like you havent reserved any trips yet'
      />
    )
  }

  return (
  <main className='container-full p-3'>
   <TripsClient 
   reservations = {reservations}
   currentUser = {currentUser}
   />
  </main>
  )
}
