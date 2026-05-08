import { useState } from 'react'

export default function useAPI() {
  const [loading, setLoading] = useState(false)
  const fetcher = async (path)=>{
    setLoading(true)
    try { const r = await fetch(path); return await r.json() }
    finally { setLoading(false) }
  }
  return { loading, fetcher }
}
