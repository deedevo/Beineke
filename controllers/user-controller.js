const User = require("../models/user-model");

// handle errors
const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' };

    // duplicate email error
    if (err.code === 11000) {
        errors.email = 'that email is already registered';
        return errors;
    }

    // validation errors
    if (err.message.includes('user validation failed')) {
        // console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            // console.log(val);
            // console.log(properties);
            errors[properties.path] = properties.message;
        });
    }

    return errors;
}

// controller actions
module.exports.signup_get = (req, res) => {
    res.render('/Users/diasibragim/Desktop/Beineke/public/views/signup.ejs');
}

module.exports.login_get = (req, res) => {
    res.render('/Users/diasibragim/Desktop/Beineke/public/views/login.ejs');
}

module.exports.signup_post = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).render('/Users/diasibragim/Desktop/Beineke/public/views/index.ejs');
    }
    catch(err) {
        const errors = handleErrors(err);
        res.status(400).send({ errors });
    }
}

module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.render('/Users/diasibragim/Desktop/Beineke/public/views/index.ejs');
}