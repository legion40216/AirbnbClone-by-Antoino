export default function Heading({title, subtitle, center}) {
  return (
    <div className={`${center ? "text-center" : "text-start"}`} >
     <p className="text-2xl font-bold">
      {title}
     </p>
     <p className="font-light text-neutral-500">
      {subtitle}
     </p>
    </div>
  )
}

