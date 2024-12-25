import React from 'react'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ({auth, children }) => {
  
    return auth ? <Navigate to='/home'/> : children

}
