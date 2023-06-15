
export default function IconLink({ Icon, title, href }) {
    const handleClick = (e) => {
        e.preventDefault()
        navigate(href)
    }

    return (
        <button onClick={handleClick} className="sidebar-icon">
            <Icon className=" p-1 m-1 h-8 w-8" />
            <pre className="text-2xl mr-2">{title}</pre>
        </button>
    )
}
