const express = require('express');
// const test = require('../controllers/userControllers');
const verifyToken = require('../utils/verifyUser');
const { test, updateUser } = require('../controllers/userControllers')
const userRouter = express.Router();

userRouter.get('/', test);
userRouter.post("/update/:id", verifyToken, updateUser)

module.exports = userRouter;