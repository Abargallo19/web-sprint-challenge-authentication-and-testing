const auth = require('../auth/auth-model');

module.exports = {
    CheckUsernameExists,
    UsernameIsUnique,
    validateLogin
}


async function UsernameIsUnique(req, res, next) {
    try {
        const users = await auth.findBy({ username: req.body.username })
        if (!users.length) {
            next()
        } else next({ message: "username taken", status: 422 })
    } catch (error) {
        next(error)
    }
}

async function CheckUsernameExists(req, res, next) {
    try {
        const users = await auth.findBy({ username: req.body.username })
        if (users.length) {
            next()
        } else {
            next({ message: "Invalid credentials" })
        }
    } catch (error) {

    }
}

async function validateLogin(req, res, next) {
    const { username, password } = req.body;
    if (typeof username !== 'string' || typeof password !== 'string' || username.trim() === '' || password.trim() === '') {
        res.status(400).json({ message: "Username and password required" })
        return;
    } else {
        next();
    }
}
