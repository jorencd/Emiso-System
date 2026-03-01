import React from 'react'
import { Icon } from "@iconify/react";

function FloaterInput({
    type = "text",
    name,
    value,
    onChange,
    label,
    icon,}) {
  return (
    <div className="relative w-full">
  
      <Icon
        icon={icon}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl"
      />

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder=" "
        className="peer w-full border-2 border-gray-300 rounded px-10 py-3 focus:border-green-700 focus:outline-none"
      />

      <label
        className="
          absolute left-10 bg-white px-1 text-gray-500
          transition-all duration-200
          peer-placeholder-shown:top-3
          peer-placeholder-shown:text-base
          peer-placeholder-shown:text-gray-400
          peer-focus:-top-2
          peer-focus:text-sm
          peer-focus:text-green-700
          -top-2 text-sm
        "
      >
        {label}
      </label>
    </div>
  )
}


export default FloaterInput