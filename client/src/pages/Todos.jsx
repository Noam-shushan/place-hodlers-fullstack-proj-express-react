import { useState, useEffect } from "react"

export default function Todos() {
    const [todos, setTodos] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(res => res.json())
            .then(data => setTodos(data))
    }
        , [])

    return (
        <div className="flex flex-col gap-2">
            {todos.map(todo => (
                <div key={todo.id} className="flex flex-row justify-between items-center bg-secondary text-primary p-2 rounded-lg shadow-lg">
                    <pre className="text-xl">{todo.title}</pre>
                    <pre className="text-xl">{todo.completed ? '✅' : '❌'}</pre>
                </div>
            ))}
        </div>
    )
}
