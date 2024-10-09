const Joi = require('joi');

const addDoctorValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            department: Joi.string().required(),
            degrees: Joi.array().required(),
            yearsOfExperience: Joi.number().min(0).required(),
            contactInfo: Joi.object().keys({
                phone: Joi.string().required(),
                email: Joi.string().email().required(),
            }),
            address: Joi.object().keys({
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zip: Joi.string().required(),
            }),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateDoctorValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            department: Joi.string().required(),
            degrees: Joi.array().required(),
            yearsOfExperience: Joi.number().min(0).required(),
            contactInfo: Joi.object().keys({
                phone: Joi.string().required(),
                email: Joi.string().email().required(),
            }),
            address: Joi.object().keys({
                street: Joi.string().required(),
                city: Joi.string().required(),
                state: Joi.string().required(),
                zip: Joi.string().required(),
            }),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}


module.exports = { addDoctorValidation, updateDoctorValidation };