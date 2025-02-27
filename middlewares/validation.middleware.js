import Joi from 'joi';

const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    age: Joi.number().greater(18).required()
});

const validateUser = (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ errors: error.details.map(err => err.message) });
    }
    next();
};

export default validateUser;
