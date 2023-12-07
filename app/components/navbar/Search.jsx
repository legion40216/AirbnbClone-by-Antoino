"use client"
import useCountries from '@/hooks/useCountries'
import useModalStore from '@/hooks/useModalStore'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { differenceInDays } from 'date-fns'
import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'

export default function Search() {
  const params = useSearchParams()
  const {getByValue} = useCountries()
  const modalSwitcher = useModalStore()
  
  const locationValue = params?.get('locationValue')
  const startDate = params?.get('startDate')
  const endDate = params?.get('endDate')
  const guestCount = params?.get('guestCount')

  const location = useMemo(()=>{
  if(locationValue){
    return getByValue(locationValue).label
  }
  return 'Anywhere'
  },[getByValue,locationValue])

  const durationLabel = useMemo(() => {
    console.log(startDate && endDate)
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} Days`;
    }

    return 'Any Week'
  }, [startDate,endDate]);

  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} Guests`;
    }

    return 'Add Guests';
  }, [guestCount]);
  
  return (
    <div className="search-container cursor-pointer"
    onClick={()=>{modalSwitcher.toggle('search')}}>
        <div>
          {location}
        </div>
        <div className="hidden sm:block border-x-[1px]">
           {durationLabel}
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden sm:block text-gray-400">
           {guestLabel}
           </div>
           <div className="p-2 bg-rose-500 rounded-full text-white">
           <MagnifyingGlassIcon width={18}/>
           </div>
        </div>
    </div>
  )
}
