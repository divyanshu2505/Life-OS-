import React from 'react'

export default function Button({children, onClick}){
  return <button onClick={onClick} className="px-3 py-1 bg-blue-500 text-white rounded">{children}</button>
}
