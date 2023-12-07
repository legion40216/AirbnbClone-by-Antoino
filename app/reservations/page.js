import React from 'react'

import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservation'

import EmptyState from '../components/EmptyState'
import ReservationClient from './ReservationClient'


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
 
  const reservations = await getReservations({params:{ authorId: currentUser.id }})

  if(!reservations || reservations.length === 0) {
    return (
      <EmptyState 
      title='No Reservation found'
      subtitle='Looks like you have no reservation on your property'
      />
    )
  }

  return (
   <main className='container-full p-3'>
    <ReservationClient
    reservations={reservations}
    currentUser={currentUser}
    />
   </main>
  )
}
