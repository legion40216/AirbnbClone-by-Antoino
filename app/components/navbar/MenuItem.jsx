"use client"

function Menuitem({ onClick, label }) {
    return (
      <li className="px-3 py-3 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
        {label}
      </li>
    );
  }
  
  export default Menuitem;