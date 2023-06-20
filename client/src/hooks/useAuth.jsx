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
            setUser(JSON.parse(token))
            setLoading(false)
        } else {
            setLoading(false)
        }
    }, [])

    const login = (username, password) => {
        console.log(username, password, "in login")
        fetch(`http://localhost:3000/api/users/login/${username}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password })
        })
            .then(res => res.json())
            .then(user => {
                console.log(user, "in login")
                localStorage.setItem('token', JSON.stringify(user))
                setUser(user)
            })
            .catch(err => console.log(err))
    }

    const signup = ({ info, address, company }) => {
        fetch('http://localhost/api/users/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ info, address, company })
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
        signup,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}