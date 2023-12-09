import prisma from '@/libs/prismadb';

export default async function getListings(params) {
  try {
    const {
      userId,
      locationValue,
      guestCount,
      bathroomCount,
      roomCount,
      startDate,
      endDate,
      category
    } = params
  
    let query = {}

    if(userId) {
      query.userId = userId
    }

    if(category) {
      query.category = category
    }

    if(guestCount) {
      query.guestCount = {
        gte: +guestCount
      }
    }

    if(roomCount) {
      query.roomCount = {
        gte: +roomCount
      }
    }
    
    if(bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      }
    }
    
    if(locationValue) {
      query.locationValue = locationValue
    }

    if (startDate && endDate) {
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate }
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate }
              }
            ]
          }
        }
      }
    }

      const result = await prisma.listing.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc'
        }
      })

  return result

  } catch (error) {
    throw new Error(error);
  } 
  }