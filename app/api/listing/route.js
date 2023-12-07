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
        category,
        location,
        guestCount,
        roomCount,
        bathroomCount,
        imageSrc,
        price,
        title,
        description,
    } = body
    console.log(description)
    const listing = await prisma.listing.create({
        data:{
            title, 
            description, 
            imageSrc,
            category,  
            roomCount,
            bathroomCount,
            guestCount, 
            locationValue: location.value,
            userId: currentUser.id, 
            price: parseInt(price, 10)
        }
    })
    
    return NextResponse.json(listing)
   }