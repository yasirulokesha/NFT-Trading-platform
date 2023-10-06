import { createContext } from 'react'
import { useLocation, Navigate } from "react-router-dom"

export const setToken = (token) => {

    localStorage.setItem('password_token', token)// make up your own token
}

export const fetchToken = (token) => {
    return localStorage.getItem('password_token')
}

export function RequireToken({ children }) {

    let auth = fetchToken()
    let location = useLocation()

    if (!auth) {
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return children;
}

export const Current_user = createContext();


