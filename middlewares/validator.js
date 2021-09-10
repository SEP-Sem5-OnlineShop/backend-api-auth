const Joi = require("joi")

const regexp = require("../utils/regexp")

/**
 * Validation Schema for the mongoose user schema
 * @type {Joi.ObjectSchema<any>}
 */
const userRegistrationValidator = Joi.object({
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    telephone: Joi.string().pattern(new RegExp(regexp.telephoneRegexp)),
    role: Joi.string().required(),
    password: Joi.string().required().min(8), // Should be validate with regexp,
    password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    location: Joi.object({
        type: Joi.string().required(),
        coordinates: Joi.array().required().items(Joi.number(), Joi.number()).length(2)
    })
})

/**
 * This function will work as a middleware for user registration route
 * If fails, will return status 400 with the error
 * @param req
 * @param res
 * @param next
 * @param validationSchema
 * @returns {Promise<*>}
 */
const middlewareBody = async (req, res, next, validationSchema) => {
    try {
        await validationSchema.validateAsync(req.body)
    }
    catch (error) {
        return res.status(400).send(error.details[0].message)
    }
    next()
}

module.exports.userSchemaValidator = async (req, res, next) => {
    await middlewareBody(req, res, next, userRegistrationValidator)
}