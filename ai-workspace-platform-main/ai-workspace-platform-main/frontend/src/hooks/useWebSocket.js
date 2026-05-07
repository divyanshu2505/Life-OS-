import { useEffect, useRef } from 'react'

export default function useWebSocket(url){
  const wsRef = useRef(null)
  useEffect(()=>{
    if(!url) return
    wsRef.current = new WebSocket(url)
    return ()=> wsRef.current?.close()
  }, [url])
  return wsRef
}
