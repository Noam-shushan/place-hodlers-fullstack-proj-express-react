import Header from "./Header"
import SignupForm from "./SignupForm"

export default function Signup() {
    return (
        <div className='flex flex-col items-center'>
            <Header
                heading="Signup to create an account"
                paragraph="Already have an account? "
                linkName="Login"
                linkUrl="/"
            />
            <SignupForm />
        </div>
    )
}