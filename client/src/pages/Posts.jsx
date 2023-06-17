import { useState, useEffect } from "react"

export default function Posts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setPosts(json))
    }, [])

    return (
        <>
            <div >
                {posts.map(post => (
                    <div key={post.id} className="flex flex-col gap-2 items-center w-full">
                        <h1 className="text-2xl font-bold">{post.title}</h1>
                        <p className="text-lg">{post.body}</p>
                    </div>
                ))}
            </div>
        </>
    )
}