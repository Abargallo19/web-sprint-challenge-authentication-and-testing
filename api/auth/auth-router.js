const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'shh';
const auth = require('../auth/auth-model');
const { uniqueUsername, shape } = require('../middleware/validate');




router.post('/register', shape, uniqueUsername, async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hash = bcrypt.hashSync(password, 8);
    const user = { username, password: hash };
    const newUser = await auth.create(user);
   
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
});

/*
  IMPLEMENT
  You are welcome to build additional middlewares to help with the endpoint's functionality.
  DO NOT EXCEED 2^8 ROUNDS OF HASHING!

  1- In order to register a new account the client must provide `username` and `password`:
    {
      "username": "Captain Marvel", // must not exist already in the `users` table
      "password": "foobar"          // needs to be hashed before it's saved
    }

  2- On SUCCESSFUL registration,
    the response body should have `id`, `username` and `password`:
    {
      "id": 1,
      "username": "Captain Marvel",
      "password": "2a$08$jG.wIGR2S4hxuyWNcBf9MuoC4y0dNy7qC/LbmtuFBSdIhWks2LhpG"
    }

  3- On FAILED registration due to `username` or `password` missing from the request body,
    the response body should include a string exactly as follows: "username and password required".

  4- On FAILED registration due to the `username` being taken,
    the response body should include a string exactly as follows: "username taken".
*/

router.post('/login', shape, async (req, res, next) => {

  try {
    const { username, password } = req.user;
    const invalid = { message: 'invalid credentials' };
    let result = await auth.findBy( { username } );
    if(!result) return res.status(404).json(message)
    if (!bcrypt.compareSync(password, result.password)) return res.status(401).json(invalid);
    const token = newtoken(req.user);
    res.json({
      token,
      message: `welcome, ${username}`
    })
  } catch (err) {
    res.status(500)
  }

});

/*
  IMPLEMENT
  You are welcome to build additional middlewares to help with the endpoint's functionality.

  1- In order to log into an existing account the client must provide `username` and `password`:
    {
      "username": "Captain Marvel",
      "password": "foobar"
    }

  2- On SUCCESSFUL login,
    the response body should have `message` and `token`:
    {
      "message": "welcome, Captain Marvel",
      "token": "eyJhbGciOiJIUzI ... ETC ... vUPjZYDSa46Nwz8"
    }

  3- On FAILED login due to `username` or `password` missing from the request body,
    the response body should include a string exactly as follows: "username and password required".

  4- On FAILED login due to `username` not existing in the db, or `password` being incorrect,
    the response body should include a string exactly as follows: "invalid credentials".
*/


// res.status(200).json({message: `Welcome, ${req.body.username}`, token: token})
function newtoken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  }
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' })
}


module.exports = router;
