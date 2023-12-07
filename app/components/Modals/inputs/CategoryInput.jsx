"use client"

export default function CategoryInput({
label,
selected,
icon:IconType,
register,
}) {
  return (
<>
<label htmlFor={label}
className={`
modal-category-box
${selected ? "border-black" : "border-neutral-200"}
`}
>
<IconType size={30} />
<p className="font-semibold">
    {label}
</p>
</label>
  
<input type="radio" 
id={label} 
className="appearance-none sr-only"
name="category" 
value={label}
defaultChecked={selected === label}  
{...register("category")}  
/>
</>
  )
}
