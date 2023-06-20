export default function IconButtom({ Icon, title, action }) {
    return (
        <button onClick={() => action()} className="sidebar-icon">
            <Icon className=" p-1 m-1 h-8 w-8" />
            <pre className="text-2xl mr-2">{title}</pre>
        </button>
    )
}