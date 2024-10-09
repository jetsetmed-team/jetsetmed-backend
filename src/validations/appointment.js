const Joi = require('joi');

const addAppointmentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            userId: Joi.string().required(),
            doctorId: Joi.string().required(),
            appointmentDate: Joi.date().required(),
            notes: Joi.string().allow("")
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}

const updateAppointmentValidation = (body)=> {
    return new Promise((resolve, reject)=> {
        const schema = Joi.object().keys({
            doctorId: Joi.string(),
            appointmentDate: Joi.date(),
            status: Joi.string(),
            notes: Joi.string().allow(""),
        });
        const { error, value } = schema.validate(body);
        if (error) {
            reject(error.details[0]);
        } else {
            resolve(value);
        }
    });
}




module.exports = { addAppointmentValidation, updateAppointmentValidation };