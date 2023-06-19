import { useState } from 'react'


/**
 * @param {ReactElement[]} staps 
 * @returns 
 */
export default function useMultiStepForm(staps) {
    const [index, setIndex] = useState(0)

    const next = () => {
        setIndex((prev) => prev + 1)
    }

    const prev = () => {
        setIndex((prev) => prev - 1)
    }

    const currentStep = staps[index]

    return {
        next,
        prev,
        currentStep,
        index: index,
        canGoNext: index < staps.length - 1,
        canGoPrev: index > 0,
    }
}