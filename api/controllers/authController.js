
const errorHandler = require('../utils/error');
const User = require('./../models/userModal');
const bcrypt = require('bcrypt');


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
}

module.exports = signup