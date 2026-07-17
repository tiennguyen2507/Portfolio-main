export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.pathname.startsWith('/ws/')) {
    setResponseStatus(event, 400)
    return { error: 'Not a websocket endpoint' }
  }
})
