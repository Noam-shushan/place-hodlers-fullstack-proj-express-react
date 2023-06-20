export default function Info() {
    const { user } = useAuth()

    return (
        <div className="ml-44 mt-16 flex-grow-[1]">
            <h1>Info</h1>
            <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
    )
}