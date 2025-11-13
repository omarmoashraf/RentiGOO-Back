const express = require('express');
const router = express.Router();
const signup = require('../../Controllers/Authentication/signup');
const login = require('../../Controllers/Authentication/login');

router.post('/signup', signup);
router.post('/login', login);

module.exports = router;