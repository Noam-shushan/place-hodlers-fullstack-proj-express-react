import { useState } from 'react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuth()

    const handleSubmit = (e) => {
        e.preventDefault()
        login(username, password)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='flex flex-col '>
                <input type="text" placeholder="username" value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}