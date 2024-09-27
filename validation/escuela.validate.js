const Joi = require('joi');

module.exports = {
    nuevaEscuela: function(data) {
        const schema = Joi.object({
            nombre: Joi.string().max(75).required(),
            clave: Joi.string().regex(/^[A-ZÑ]{2}\d{4}$/).required(),
            registro: Joi.string().regex(/^[A-ZÑ]{4}\d{6}[A-ZÑ]\d{2}$/).required(),
            estudiantes: Joi.array().optional(),
            colaboradores: Joi.array().optional(),
            carreras: Joi.object().required()
        });

        const validate = schema.validate(data);
        return validate;
    }
}