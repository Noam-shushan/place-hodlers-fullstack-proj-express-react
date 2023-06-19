import { useState } from 'react';
import { loginFields } from "./fields"
import Input from "./Input";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import { useAuth } from '../../hooks/useAuth.jsx'

const fields = loginFields;
let fieldsState = {};
fields.forEach(field => fieldsState[field.id] = '');

export default function LoginForm() {
    const [loginState, setLoginState] = useState(fieldsState);
    const { login } = useAuth()

    const handleChange = (e) => {
        setLoginState({ ...loginState, [e.target.id]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        login(loginState.username, loginState.password);
    }

    return (
        <form className="mt-8 space-y-6">
            <div className="-space-y-px">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={loginState[field.id]}
                            {...field}
                        />

                    )
                }
            </div>

            <FormExtra />
            <FormAction handleSubmit={handleSubmit} text="Login" />
        </form>
    )
}