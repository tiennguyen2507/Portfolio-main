export default defineNitroPlugin((nitroApp) => {
  const isIgnorableError = (err: any) => {
    if (!err) return false
    const str = typeof err === 'string' ? err : (err.message || '') + ' ' + (err.code || '') + ' ' + (err.syscall || '')
    const ignorableCodes = ['EPIPE', 'ECONNRESET', 'ETIMEDOUT', 'ECONNREFUSED', 'ENOTFOUND']
    return ignorableCodes.some((c) => str.includes(c))
  }

  const wrapListener = (listener: any) => {
    return (err: any, ...args: any[]) => {
      if (isIgnorableError(err)) {
        return
      }
      listener(err, ...args)
    }
  }

  const events = ['unhandledRejection', 'uncaughtException'] as const

  // Wrap existing listeners
  for (const event of events) {
    const listeners = process.listeners(event)
    process.removeAllListeners(event)
    for (const listener of listeners) {
      process.on(event, wrapListener(listener))
    }
  }

  // Intercept future listeners
  const originalOn = process.on
  process.on = function (event: any, listener: any) {
    if (events.includes(event)) {
      return originalOn.call(this, event, wrapListener(listener))
    }
    return originalOn.call(this, event, listener)
  }

  const originalAddListener = process.addListener
  process.addListener = function (event: any, listener: any) {
    if (events.includes(event)) {
      return originalAddListener.call(this, event, wrapListener(listener))
    }
    return originalAddListener.call(this, event, listener)
  }
})
