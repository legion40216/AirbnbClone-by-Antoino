"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { useCallback } from "react"
import queryString from "query-string"

export default function CategoriesBox({
label,
selected,
icon:IconType,
}) {
  const router = useRouter()
  const params = useSearchParams()
  
  const handleClick = useCallback(()=>{
  
    let currentQuery = {}

    if(params){
      currentQuery = queryString.parse(params.toString())
    } 
    const updatedQuery = {
      ...currentQuery,
      category: label
    }

   if(params.get('category') === label) {
    delete updatedQuery.category
   }

   const url = queryString.stringifyUrl({
    url: '/',
    query: updatedQuery
  }, { skipNull: true });

  router.push(url);
}, [label, router, params]);

  return (
    <div onClick={handleClick} className={`categories-box 
    ${selected ? "border-b-neutral-800": "border-transparent"}
    ${selected ? "text-neutral-800": "text-neutral-500"}
    `}>
     <IconType size={26}/>
     <p className="font-medium text-xs">
      {label}
     </p>
    </div>
  )
}
