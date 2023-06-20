import Header from './Header.jsx'
import LoginForm from './LoginForm'

export default function Login() {
    return (
        <div className='flex flex-col items-center'>
            <Header
                heading="Login to your account"
                paragraph="Don't have an account yet? "
                linkName="Signup"
                linkUrl="/signup"
            />
            <LoginForm />
        </div>
    )
}
