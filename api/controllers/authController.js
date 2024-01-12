
const errorHandler = require('../utils/error');
const User = require('./../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// @desc    Register a new user
const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashedPassword
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" })
    }
    catch (error) {
        next(errorHandler(500, 'Something went wrong'))
    }
};

// @desc    Authenticate an existing user
const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        const isValidPass = bcrypt.compareSync(password, validUser.password);
        if (!isValidPass) return next(errorHandler(401, 'Wrong credentials'));
        let token = jwt.sign({ id: validUser._id }, process.env.JWT_SECERET)

        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate })
            .status(200)
            .json(rest)
    }

    catch (error) {
        next(error)
    }
};

module.exports = {
    signup,
    signin
};
