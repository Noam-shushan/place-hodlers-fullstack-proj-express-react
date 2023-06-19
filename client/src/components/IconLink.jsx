import { Link } from 'react-router-dom'

export default function IconLink({ Icon, title, to }) {
    return (
        <Link to={to} className="sidebar-icon">
            <Icon className=" p-1 m-1 h-8 w-8" />
            <pre className="text-2xl mr-2">{title}</pre>
        </Link>
    )
}


