"use client"
import { useCallback } from "react"
import { XMarkIcon } from '@heroicons/react/24/outline'

import Button from "../Button"

export default function Modal({
modalType,
modal,
toggle,
onSubmit,
title,
body,
footer,
actionLabel,
disabled,
secondaryAction,
secondaryActionLabel
}) {
  const handleClose = useCallback(() => {
    if (disabled) {
      return;
    }
    toggle(null);
  }, [toggle, disabled]);

const handleSubmit = useCallback(() => {
  if(disabled) {
    return;
   }
   onSubmit()
},[onSubmit,disabled])

const handleSecondaryAction = useCallback(() => {
  if(disabled || !secondaryAction ) {
    return;
   }
   secondaryAction()
},[disabled,secondaryAction])

if (modal !== modalType) {
  return null;
}

  return (
  // <>{(!isOpen && modal !== modalType)&&   }</>
   <div className="modal-backdrop">
    <div className={`modal flow`}>
      {/*HEADER*/}
      <div className="relative p-6 flex items-center justify-center rounded-t border-b-[1px]">
       <button 
       className="absolute left-9 p-1 border-0 hover:opacity-70 transition"
       onClick={handleClose} >
        <XMarkIcon width={18} />
       </button>
       <div className="text-lg font-semibold">
        {title}
       </div>
      </div>
        {/*BODY*/}
          <div className="px-6 grid-flow">
          {body}
          </div>
        {/*FOOTER*/}
        <div className="grid gap-2 p-6">
         <div className="flex gap-2 items-center">
          {secondaryAction && secondaryActionLabel && (
         <Button
          outline 
          disabled={disabled}
          label={secondaryActionLabel}
          onClick={handleSecondaryAction}
          />
          )}
          <Button 
          disabled={disabled}
          label={actionLabel}
          onClick={handleSubmit}
          />
         </div>
         {footer}
        </div>
    </div>
   </div>

  )
}
