const Joi = require('joi');

const addPaymentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            appointmentId: Joi.string().required(),
            userId: Joi.string().required(),
            amount: Joi.number().required(),
            paymentMethod: Joi.string().required(),
            transactionId: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updatePaymentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            appointmentId: Joi.string().required(),
            userId: Joi.string().required(),
            amount: Joi.number().required(),
            paymentMethod: Joi.string().required(),
            transactionId: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}




module.exports = { addPaymentValidation, updatePaymentValidation };