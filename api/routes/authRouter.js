const express = require('express');
const { signin, signup } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)

module.exports = authRouter;