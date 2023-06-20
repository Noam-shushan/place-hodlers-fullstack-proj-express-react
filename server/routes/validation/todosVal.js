import Jo from "joi"

export function validateOnPost(todo) {
    const schema = Jo.object({
        userId: Jo.number().required(),
        title: Jo.string().required(),
        completed: Jo.boolean().required()
    })
    return schema.validate(todo)
}

export function validateOnUpdate(todo) {
    const schema = Jo.object({
        userId: Jo.number().optional(),
        title: Jo.string().optional(),
        completed: Jo.boolean().optional()
    })
    return schema.validate(todo)
}
