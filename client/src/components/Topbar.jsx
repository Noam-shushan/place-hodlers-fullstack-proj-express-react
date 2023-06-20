import { useAuth } from "../hooks/useAuth.jsx"

export function Topbar() {
    const { user } = useAuth()
    return (
        <div className="fixed left-44 top-0 overflow-auto w-screen opacity-60 h-16 bg-primary text-white shadow-sm font-mono">
            <div className="flex gap-2">
                <h1>todos: {user.todosCount}</h1>
                <h1>posts: {user.postsCount}</h1>
                <h1>albums: {user.albumsCount}</h1>
            </div>
        </div>

    )
}