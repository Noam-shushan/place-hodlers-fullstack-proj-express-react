import { useState } from 'react'
import useMultiStepForm from '../../hooks/useMultiStapForm.js'
import { useAuth } from '../../hooks/useAuth'
import { signupFields, addressFields, companyFields } from "./fields"
import FormAction from "./FormAction"
import Input from "./Input"

export default function SignupForm() {
    const [info, setInfo] = useState({})
    const [address, setAddress] = useState({})
    const [company, setCompany] = useState({})
    const { signup } = useAuth()

    const onInfoChange = info => setInfo(info)
    const onAddressChange = address => setAddress(address)
    const onCompanyChange = company => setCompany(company)

    const staps = [
        <Form fields={signupFields} title="Info" onChange={onInfoChange} />,
        <Form fields={addressFields} title="Address" onChange={onAddressChange} />,
        <Form fields={companyFields} title="Company" onChange={onCompanyChange} />
    ]
    const { next, prev, currentStep, index, canGoNext, canGoPrev } = useMultiStepForm(staps)


    const handleSubmit = (e) => {
        e.preventDefault()
        signup({ info, address, company })
    }

    return (
        <form className="" onSubmit={handleSubmit}>
            <div>
                <p>
                    Step {index + 1} / {staps.length}
                </p>
                {currentStep}
                <div className='flex justify-between text-2xl'>
                    <button disabled={!canGoPrev} onClick={() => prev()}>
                        {"<"}
                    </button>
                    <button disabled={!canGoNext} onClick={() => next()}>
                        {">"}
                    </button>
                </div>
            </div>
            <FormAction handleSubmit={handleSubmit} text="Signup" />

        </form>
    )
}

function Form({ fields, title, onChange }) {
    let fieldsState = {}
    fields.forEach(field => fieldsState[field.id] = '')
    const [formState, setFormState] = useState(fieldsState);

    const handleChange = (e) => {
        setFormState({ ...formState, [e.target.id]: e.target.value })
        onChange(formState)
    }

    return (
        <>
            <h1>{title}</h1>
            <div className="grid grid-flow-rows grid-rows-3 grid-cols-3 gap-2">
                {
                    fields.map(field =>
                        <Input
                            key={field.id}
                            handleChange={handleChange}
                            value={formState[field.id]}
                            {...field}
                        />
                    )
                }
            </div>
        </>
    )
}
