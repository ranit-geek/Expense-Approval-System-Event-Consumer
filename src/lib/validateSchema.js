const Joi=require("joi");

function validateSchema(course)
{
        const schemaPost={
            uuid : Joi.string().min(2).required(),
            description : Joi.string().min(2).required(),
            created_at : Joi.date().required(),
            amount: Joi.number().min(2).required(),
            currency: Joi.string().min(2).required(),
            employee: {
                uuid: Joi.string().min(2).required(),
            first_name: Joi.string().min(2).required(),
            last_name: Joi.string().min(2).required()
            }
        }
        return Joi.validate(course,schemaPost);
}

exports.validate=validateSchema