import { NextResponse } from 'next/server'
import prisma from '@/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request) {
    const currentUser = await getCurrentUser()
    if(!currentUser)
    {
        return NextResponse.error()
    }
    const body = await request.json()
    const {
        totalPrice,
        startDate,
        endDate,
        listingId
    } = body

    let emptyFields = []

  if(!totalPrice){
   emptyFields.push('totalPrice')
  }
  if(!startDate){
    emptyFields.push('startDate')
  }
  if(!endDate){
    emptyFields.push('endDate')
  }
  if(!listingId){
      emptyFields.push('listingId')
    }
    if(emptyFields.length > 0)
  {
    return NextResponse.error()
  }

  const listingAndReservation = await prisma.listing.update({
    where: {
      id: listingId
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
        }
      }
    }
  });

    return NextResponse.json(listingAndReservation)
   }