const Joi = require('joi');

const qnaItemSchema = Joi.object({
  question: Joi.string().required(),
  answer: Joi.string().required()
});

const addQNAValidation = (body) => {
    return new Promise((resolve, reject) => {
        const schema = Joi.object().keys({
            qna: Joi.array().items(qnaItemSchema).required(),
        }).unknown(true); // Allow unknown keys

        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            // Remove pdfPath if it exists
            const { pdfPath, ...validatedData } = value;
            resolve(validatedData);
        }
    });
}

const updateQNAValidation = (body) => {
    return new Promise((resolve, reject) => {
        const schema = Joi.object().keys({
            qna: Joi.array().items(qnaItemSchema),
        }).unknown(true); // Allow unknown keys

        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            // Remove pdfPath if it exists
            const { pdfPath, ...validatedData } = value;
            resolve(validatedData);
        }
    });
}

module.exports = { addQNAValidation, updateQNAValidation };
