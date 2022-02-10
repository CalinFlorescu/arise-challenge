import { Context } from "koa";
const Joi = require('@hapi/joi');

const bookingSchema = Joi.object().keys({
    hotel: Joi.object().keys({
        id: Joi.string().required,
        partner_ref: Joi.string().required,
        name: Joi.string().required(),
        url: Joi.string().required(),
        photos: Joi.array().items(Joi.string()),
        country: Joi.string().required()
    }).required,
    rooms: Joi.array().items(Joi.object().keys({
        partner_reference: Joi.string().required,
        room_name: Joi.string().required,
        description: Joi.string().required,
        photos: Joi.array().items(Joi.string()),
        price: Joi.object().keys({
            currency: Joi.string().required,
            amount: Joi.number()
        }).required
    }))
})

export default (ctx: Context, next: () => any) => {
    console.log('Here I am', ctx.body)
    const { error } = bookingSchema.validate(ctx.body)

    console.log(error)

    if (!error) {
        return next()
    } else {
        ctx.status = 400
        ctx.body = {
            error: 'Validation error',
            validation: {
                path: '/booking',
                errors: error.details
            }
        }
    }
}