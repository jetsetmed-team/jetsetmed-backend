const Joi = require('joi');

const addCallBackRequestValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required().min(2).max(50),
            email: Joi.string().email(),
            phoneNumber: Joi.string().regex(/^[0-9]{10}$/).messages({'error': `Phone number must have 10 digits.`}),
            message: Joi.string().required(),
            haveTalk: Joi.boolean().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateCallBackRequestValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            haveTalk: Joi.boolean().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}




module.exports = { addCallBackRequestValidation, updateCallBackRequestValidation };