const express = require('express');
const User = require('../models/User');
const { generateToken } = require('../utils/auth');
const { validateUsername, validatePassword } = require('../utils/validators');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const usernameError = validateUsername(req.body.username);
  const passwordError = validatePassword(req.body.password);
  if (usernameError === undefined && passwordError === undefined) {
    try {
      const user = await User.signUp(
        req.body.username.toLowerCase(),
        req.body.password
      );
      const token = generateToken(req.body.username);
      return res.status(201).json({
        message: `Successfully created username "${req.body.username}"`,
        token,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({ error: { username: 'Username is already used' } });
      } else {
        console.log(error);

        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    return res.status(400).json({
      error: {
        username: usernameError,
        password: passwordError,
      },
    });
  }
});

router.post('/login', async (req, res) => {
  const usernameError = validateUsername(req.body.username);
  const passwordError = validatePassword(req.body.password);
  if (usernameError === undefined && passwordError === undefined) {
    try {
      const username = req.body.username.toLowerCase();
      const password = req.body.password;
      const isAuthenticated = await User.login(username, password);
      if (isAuthenticated) {
        const token = generateToken(username);
        return res.status(200).json({
          token,
        });
      } else {
        return res.status(400).json({
          error: {
            username: 'Invalid credential',
            password: 'Invalid credential',
          },
        });
      }
    } catch (error) {
      if (error.message === 'Username not found') {
        return res
          .status(400)
          .json({ error: { username: 'Username not found' } });
      } else {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    return res.status(400).json({
      error: {
        username: usernameError,
        password: passwordError,
      },
    });
  }
});

module.exports = router;
