const express = require('express');
// const test = require('../controllers/userControllers');
const verifyToken = require('../utils/verifyUser');
const { test, updateUser, deleteUser } = require('../controllers/userControllers')
const userRouter = express.Router();

userRouter.get('/', test);

userRouter.post("/update/:id", verifyToken, updateUser);

userRouter.delete("/delete/:id", verifyToken, deleteUser);

module.exports = userRouter;