import React, { createContext } from 'react'
import { routes } from 'routes/routes'
export const RouteContext = createContext(routes)

interface IRouteContextProviderProps {
  children: any
}

const RouteContextProvider = ({ children }: IRouteContextProviderProps) => {
  return (
    <RouteContext.Provider value={routes}>{children}</RouteContext.Provider>
  )
}

export default RouteContextProvider
