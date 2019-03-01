import {
  complement,
  either,
  has,
  is,
} from 'ramda'

const isNotObject = either(
  complement(is(Object)),
  either(
    is(Function),
    is(Array)
  )
)

const isFunction = is(Function)

const enhanceFunction = (prop, errorHandler) => {
  if (errorHandler && isFunction(prop)) {
    return (...parameters) => prop(...parameters).catch(errorHandler)
  }

  return prop
}

const getProxyHandler = (fallback, errorHandler) => ({
  get (target, key) {
    const hasKey = has(key)

    if (hasKey(target)) {
      const propInTarget = target[key]

      if (isNotObject(propInTarget)) {
        return enhanceFunction(propInTarget, errorHandler)
      } else if (hasKey(fallback)) {
        return new Proxy(
          propInTarget,
          getProxyHandler(fallback[key], errorHandler)
        )
      }

      return propInTarget
    }
    if (hasKey(fallback)) {
      const propInFallback = fallback[key]
      if (isNotObject(propInFallback)) {
        return enhanceFunction(propInFallback, errorHandler)
      }
      return new Proxy(
        propInFallback,
        getProxyHandler(propInFallback, errorHandler)
      )
    }

    return undefined
  },
})

const proxy = cockpit => (client, errorHandler) => {
  const cockpitWithClient = cockpit(client)

  return new Proxy(cockpitWithClient, getProxyHandler(client, errorHandler))
}

export default proxy
