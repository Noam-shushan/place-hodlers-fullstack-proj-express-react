import { useEffect } from 'react'

export default function App() {

  useEffect(() => {
    fetch(`http://localhost:3000/api/users`)
      .then(response => response.json())
      .then(data => console.log(data))
  }, [])


  return (
    <>
      <h1 className="text-5xl text-center">
        Hello world!
      </h1>
    </>
  )
}