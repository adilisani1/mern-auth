const express = require('express');

const test = express.Router();

test.get('/', (req, res) => {
    res.json({
        message: "API is working!"
    })
})

module.exports = test;