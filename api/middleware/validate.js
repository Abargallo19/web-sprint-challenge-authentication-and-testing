const auth = require('../auth/auth-model');

module.exports = {
    uniqueUsername,
    shape
};

async function uniqueUsername(req, res, next) {
    const { username } = req.body;
    let result = await auth.findBy({ username });
    if (result) return res.status(404).json({ message: 'username taken' })
    next()
}

function shape(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username and password required" });
    next();
     


};