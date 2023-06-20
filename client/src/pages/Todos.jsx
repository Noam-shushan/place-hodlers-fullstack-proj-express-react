import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"

function Todo({ todo }) {
    const [title, setTitle] = useState(todo.title)
    const [completed, setCompleted] = useState(todo.completed)

    const updateTodo = () => {
        fetch(`http://localhost:3000/api/todos/${todo.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, completed: completed == 1, userId: todo.userId })
        })
            .then(res => res.json())
            .then(data => {
                const { success } = data
                console.log(success)
            })
    }

    const handleTitleChange = (e) => {
        setTitle(e.target.value)
        updateTodo()
    }

    const handleCompletedChange = (e) => {
        setCompleted(e.target.checked)
        updateTodo()
    }

    return (
        <div className="flex flex-row justify-between items-center bg-secondary text-primary p-2 rounded-lg shadow-lg">
            <pre className="text-xl" onChange={handleTitleChange}>{todo.title}</pre>
            <input type="checkbox" checked={todo.completed} onChange={handleCompletedChange} />
        </div>
    )
}

export default function Todos() {
    const [todos, setTodos] = useState([])
    const { user } = useAuth()

    useEffect(() => {
        fetch(`http://localhost:3000/api/todos/${user.id}`)
            .then(res => res.json())
            .then(data => setTodos(data))
    }
        , [])

    return (
        <div className="flex flex-col gap-2">
            {todos.map(todo => (
                <Todo key={todo.id} todo={todo} />
            ))}
        </div>
    )
}
