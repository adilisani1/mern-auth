
const errorHandler = require('../utils/error');
const User = require('./../models/userModal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
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

// Authenticate an existing user
const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User not found'));
        // Checking the password
        const isValidPass = bcrypt.compareSync(password, validUser.password);
        if (!isValidPass) return next(errorHandler(401, 'Wrong credentials'));

        let token = jwt.sign({ id: validUser._id }, process.env.JWT_SECERET)

        const { password: hashedPassword, ...rest } = validUser._doc
        const expiryDate = new Date(Date.now() + 3600000); // 1 hour

        res.cookie('access_token', token, {
            httpOnly: true,
            expires: expiryDate
        })
            .status(200)
            .json(rest)
    }

    catch (error) {
        next(error)
    }
};

//google Authentication
const google = async (req, res, next) => {
    // const { email} = req.body;
    try {
        const user = await User.findOne({ email: req.body.email });

        if (user) {
            let token = jwt.sign({ id: user._id }, process.env.JWT_SECERET);

            const { password: hashedPassword, ...rest } = user._doc
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour

            res.cookie('access_token', token, {
                httpOnly: true, expires: expiryDate
            })
                .status(200)
                .json(rest)
        }
        else {
            const generatedPassword =
                Math.random().toString(36)
                    .slice(-8) + Math.random().toString(36).slice(-8);

            const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

            const newUser = new User({
                username:
                    req.body.name.split(" ").join("").toLowerCase() +
                    Math.floor(Math.random() * 10000).toString(),
                email: req.body.email,
                password: hashedPassword,
                profilePicture: req.body.photo
            });
            await newUser.save();

            let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECERET);
            const { password: hashedPassword2, ...rest } = newUser._doc
            const expiryDate = new Date(Date.now() + 3600000); // 1 hour
            res.cookie('access_token', token, {
                httpOnly: true,
                expires: expiryDate
            })
                .status(200)
                .json(rest)
        }

    } catch (error) {
        next(error)
    }
}


module.exports = {
    signup,
    signin,
    google
};



