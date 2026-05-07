export function connect(url){
  const ws = new WebSocket(url)
  return ws
}
