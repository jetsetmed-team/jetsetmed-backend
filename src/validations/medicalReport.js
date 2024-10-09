const Joi = require('joi');

const addMedicalReportValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            title: Joi.string().required(),
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

module.exports = { addMedicalReportValidation };