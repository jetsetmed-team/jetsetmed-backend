const Joi = require('joi');

const addServiceValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            serviceName: Joi.string().required(),
            points: Joi.number().required(),
            doctorId: Joi.string().required(),
            description: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateServiceValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            serviceName: Joi.string().required(),
            points: Joi.number().required(),
            doctorId: Joi.string().required(),
            description: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}



module.exports = { addServiceValidation, updateServiceValidation };