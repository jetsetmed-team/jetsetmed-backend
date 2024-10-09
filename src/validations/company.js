const Joi = require('joi');

const addCompanyValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            phoneNumber: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateCompanyValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            phoneNumber: Joi.string(),
            userId: Joi.string(),
            status: Joi.string(),
            registeredStudents: Joi.string(),
            subscribedStudents: Joi.string(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}




module.exports = { addCompanyValidation, updateCompanyValidation };