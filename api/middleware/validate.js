const auth = require('../auth/auth-model');

module.exports = {
    CheckUsernameExists,
    UsernameIsUnique,
    CheckPassword,
}


async function UsernameIsUnique(req, res, next) {
    try {
        const users = await auth.findBy({username: req.body.username})
        if(!users.length){
            next()
        } else next({message: "username taken", status: 422})
    } catch (error) {
        next(error)
    }
}