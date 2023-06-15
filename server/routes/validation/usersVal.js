import Joi from 'joi'

export function validateOnLogin(user) {
    const schema = Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

export function validateUserOnUpdate(user) {
    const schema = Joi.object({
        firstName: Joi.string().optional(),
        lastName: Joi.string().optional(),
        username: Joi.string().required(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional()
    })
    return schema.validate(user)
}

export function validateUserOnPost(user) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string().required(),
        password: Joi.string().required()
    })
    return schema.validate(user)
}

export function validateQueryOnGetUsers(query) {
    const schema = Joi.object({
        limit: Joi.number().integer().min(1).max(100).default(10),
        offset: Joi.number().integer().min(0).default(0)
    })
    return schema.validate(query)
} 