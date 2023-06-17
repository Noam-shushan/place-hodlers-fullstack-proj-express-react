import { useAuth } from "../hooks/useAuth"
import Login from "../pages/Login"
import Posts from "../pages/Posts"

export default function Deshbord() {
    const { user, login, logout } = useAuth()

    return (
        <div className="ml-44 mt-16 flex-grow-[1]">
            <Posts />
        </div>
    )
}