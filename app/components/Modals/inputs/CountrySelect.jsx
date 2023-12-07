"use client"

import useCountries from "@/hooks/useCountries"
import Select from "react-select"

export default function CountrySelect({value, onChange}) {

    const { getAll } = useCountries()

  return (
    <Select 
    placeholder = "Anywhere"
    isClearable
    options={getAll()}
    value={value}
    onChange={(value) => onChange(value)}
    formatOptionLabel={(option) => (
        <div className="
        flex items-center gap-3">
          <div>{option.flag}</div>
          <p>
            {option.label},
            <span className="text-neutral-500 ml-1">
              {option.region}
            </span>
          </p>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg'
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6'
        }
      })}
    />
  )
}
