import { BsCheckCircleFill } from 'react-icons/bs'
import { SiBookstack } from 'react-icons/si'
import { FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import IconLink from './IconLink'
import IconButtom from './IconButtom'
import { useAuth } from '../hooks/useAuth'


export default function SideBar() {
    const { logout } = useAuth()

    return (
        <div className="overflow-auto fixed w-44 h-screen flex flex-col justify-between p-2 items-center bg-primary text-secondary shadow-lg">
            <div className='flex flex-col gap-2 items-center w-full'>
                <IconLink Icon={FaUserCircle} title="Info" to="/info" />
                <IconLink Icon={SiBookstack} title="Posts" to="/posts" />
                <IconLink Icon={BsCheckCircleFill} title="Todos" to="/todos" />
            </div>
            <IconButtom className="" Icon={FiLogOut} title="Logout" action={logout} />
        </div>
    )
}