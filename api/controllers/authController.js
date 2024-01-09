
const User = require('./../models/userModal');

const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const newUser = new User({
        username,
        email,
        password
    });
    try {
        await newUser.save();
        res.status(201).json({ message: "User created successfully" })
    }
    catch (error) {
        next(error)
    }
}

module.exports = signup