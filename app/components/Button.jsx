"use client"

export default function Button({
  label, 
  disabled, 
  outline, 
  small, 
  icon: Icon, 
  onClick }) {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={`disabled:opacity-70 
    disabled:cursor-not-allowed 
    rounded-lg 
    hover:opacity-70 
    transition
    w-full
    border-2
    ${outline ? "bg-white border-black text-black" 
    : "bg-rose-500 border-rose-500 text-white"}
    ${small ? "py-1 text-sm font-light border-1" 
    : "py-3 text-md font-semibold border-b-2"}
    `}>
    {Icon && (
      <div className="absolute">
      <Icon width={18} />
      </div>
    )}
    {label}
    </button>
  
  )
}
