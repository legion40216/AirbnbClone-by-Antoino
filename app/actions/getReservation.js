import prisma from '@/libs/prismadb'
import { revalidatePath } from 'next/cache';

export default async function getReservations({params}) {

  try {
    const { listingId, userId, authorId } = params;

    const query = {};
        
    if (listingId) {
      query.listingId = listingId;
    };

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.listing = { userId: authorId };
    }
    
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
        user:true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return reservations;

  } catch (error) {
    throw new Error(error);
  } finally {
    revalidatePath("/") 
  }
}