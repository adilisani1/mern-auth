const express = require('express');
const test = require('../controllers/userControllers');

const userRouter = express.Router();

userRouter.get('/', test)

module.exports = userRouter;