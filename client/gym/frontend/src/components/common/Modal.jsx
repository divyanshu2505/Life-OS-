import React from 'react'

export default function Modal({children}){
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="bg-white p-6 rounded shadow">{children}</div>
    </div>
  )
}
