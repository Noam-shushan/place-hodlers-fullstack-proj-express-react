import { useAuth } from "../hooks/useAuth"
import Posts from "../pages/Posts"
import Todos from "../pages/Todos"
import Info from "../pages/Info"
import { Routes, Route } from "react-router-dom"

export default function Deshbord() {
    const { user, login, logout } = useAuth()

    return (
        <div className="ml-44 mt-16 flex-grow-[1]">
            <Routes>
                <Route path="/" element={<h1 className="text-2xl text-center">Hi {user.firstName}</h1>} />
                <Route path="/info" element={<Info />} />
                <Route path="/posts" element={<Posts />} />
                <Route path="/todos" element={<Todos />} />
            </Routes>
        </div>
    )
}