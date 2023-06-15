import { useState, useEffect, useContext, createContext } from 'react'

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            fetch('/api/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data)
                    setLoading(false)
                })
        } else {
            setLoading(false)
        }
    }, [])

    const login = (username, password) => {
        fetch(`http://localhost/api/users/login?username=${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
            .then(res => res.json())
            .then(user => {
                localStorage.setItem('token', user)
                setUser(user)
            })
            .catch(err => console.log(err))
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }

    const value = {
        user,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}