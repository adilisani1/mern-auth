const express = require('express');
const { signin, signup, google } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.post("/signup", signup)
authRouter.post("/signin", signin)
authRouter.post("/google", google)

module.exports = authRouter;