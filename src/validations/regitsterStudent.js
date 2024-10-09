const Joi = require('joi');

const addRegisterStudentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            address: Joi.string().required(),
            country: Joi.string().required(),
            purpose: Joi.string().allow(""),
            isSubscriptionTaken: Joi.boolean().required(),
            amountPaidByAdmin: Joi.boolean().required(),
            companyId: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateRegisterStudentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            name: Joi.string().required(),
            address: Joi.string().required(),
            country: Joi.string().required(),
            purpose: Joi.string().allow(""),
            isSubscriptionTaken: Joi.boolean().required(),
            amountPaidByAdmin: Joi.boolean().required(),
            companyId: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}




module.exports = { addRegisterStudentValidation, updateRegisterStudentValidation };