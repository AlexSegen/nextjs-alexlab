import Joi  from '@hapi/joi';

export const validateMessage = message => {

    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        subject: Joi.string().min(3).max(50).required(),
        email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { } }),
        content: Joi.string().min(3).max(300).required()
    });

    return schema.validate(message);
}