import Joi from 'joi'

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