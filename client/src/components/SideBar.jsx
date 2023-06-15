import { BsCheckCircleFill } from 'react-icons/bs'
import { SiBookstack } from 'react-icons/si'
import { FaUserCircle } from 'react-icons/fa'
import { FiLogOut } from 'react-icons/fi'
import IconLink from './IconLink'


export default function SideBar() {
    return (
        <div className="fixed top-0 left-0 h-screen flex flex-col justify-between p-2 items-center w-1/6 bg-primary text-secondary shadow-lg">
            <div className='flex flex-col gap-2 items-center w-full'>
                <IconLink Icon={FaUserCircle} title="Info" href="/info" />
                <IconLink Icon={SiBookstack} title="Posts" href="/posts" />
                <IconLink Icon={BsCheckCircleFill} title="Todos" href="/todos" />
            </div>
            <IconLink className="" Icon={FiLogOut} title="Logout" href="/logout" />
        </div>
    )
}