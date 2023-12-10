"use client"
import { categories } from '@/app/constants/categoryIcons';
import CategoriesBox from './CategoriesBox';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Categories() {
  const params = useSearchParams()
  const category = params.get('category')
  const pathname = usePathname()

  const isMainPage = pathname === '/'

  if(!isMainPage)
  {
    return null
  }
  return (
    <div className=" 
    max-w-100vw
    flex 
    justify-between 
    items-center 
    overflow-x-auto">
     {
        categories.map((item)=>(
            <CategoriesBox 
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
            />
        ))
     }
    </div>
  )
}
