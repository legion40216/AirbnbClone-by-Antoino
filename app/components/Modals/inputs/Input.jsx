"use client"

import { CurrencyDollarIcon } from "@heroicons/react/24/outline"

export default function Inputs({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  placeholder
}) {

  return (
    <div>
        <label htmlFor={id}>{label}</label>
        <div className="relative">
        <div className="absolute vertical-center left-3 text-neutral-700">
        {formatPrice && (
          <CurrencyDollarIcon width={18}/>
        )}
      </div>
        <input 
         className={`modal-inputs p-4
         ${formatPrice ? "pl-9": "pl-4"}
         ${errors[id] ? " border-rose-500": " border-neutral-300"}
         ${errors[id] ? " focus:border-rose-500": " focus:border-neutral-bloa"}
         `}
         id={id}
         name={label}
         disabled={disabled}
         {...register(id, { required })}
         placeholder={placeholder}
         type={type}
         />
        </div>
    </div>
  )
}
