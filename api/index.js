

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRouter = require('./routes/userRouter');
const authRouter = require('./routes/authRouter');

dotenv.config()
const port = 3000;
const app = express();



mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
})

app.use("/api/user", userRouter)
app.use("/api/auth", authRouter)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})