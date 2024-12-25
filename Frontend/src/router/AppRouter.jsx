import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Vista } from '../pages/Vista'
import { PrivateRoute } from './PrivateRoute'
import { useAuthStore } from '../stores/useAuthStore'
import { PublicRoute } from './PublicRoute'
import { Login } from '../pages/Login'
import { VistaDos } from '../pages/VistaDos'

export const AppRouter = () => {
    let token;
    const { isAuth } = useAuthStore()

    useEffect(() => {
        let unsuscribed = true

       token = sessionStorage.getItem('token')

        return () => unsuscribed = false
    }, [])

    return (
        <BrowserRouter>
            <Routes>
            
                <Route path='/*' element={
                      <Vista />
                } />
                <Route path='/home/pagos' element={
                     
                        <VistaDos />
              
                } />
                <Route path='/home' element={
                    <PrivateRoute auth={isAuth} >
                        <Dashboard />
                    </PrivateRoute>
                } />
                
                <Route path='/login' element={
                    <PublicRoute auth={isAuth}>
                        <Login />
                    </PublicRoute>
                } />
                <Route path='*' element={<h1>404</h1>} />
            </Routes>
        </BrowserRouter>
    )
}