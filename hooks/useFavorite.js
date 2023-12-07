import { useCallback, useMemo, } from "react";
import { toast } from "react-hot-toast";
import useModalStore from "./useModalStore";
import { useRouter } from "next/navigation";

const useFavorite = ({listingId, currentUser}) => {
  const router = useRouter();
  const modalSwitcher = useModalStore()

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

    const toggleFavorite = useCallback(async ()=> {

      if(!currentUser) {
        return modalSwitcher.toggle("login")
      }

      try {
        let method;
        let successMessage;

        if (hasFavorited) {
          method = 'DELETE';
          successMessage = 'Removed from favorites';
        } else {
          method = 'POST';
          successMessage = 'Added to favorites';
        }

        const response = await fetch('/api/favorites/' + listingId, {
          method,
          headers: method === 'POST' ? { 'Content-Type': 'application/json' } : {},
          body: method === 'POST' ? JSON.stringify({}) : undefined,
        });
      
      if (response.ok) {
      router.refresh();
      toast.success(successMessage)
      } else {
      throw new Error("server failed")
      } 
     } catch (error) {
      toast.error('Something went wrong.');
     }
    },[
      currentUser,
      toast,
      hasFavorited,
      modalSwitcher,
      router
    ])

    return {
      hasFavorited,
      toggleFavorite
    }
}

export default useFavorite