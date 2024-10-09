const Joi = require('joi');

const addQNAValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            qna: Joi.array().required(),
            pdfPath: Joi.string().required(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateQNAValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            qna: Joi.array(),
            pdfPath: Joi.string(),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

module.exports = { addQNAValidation, updateQNAValidation };
