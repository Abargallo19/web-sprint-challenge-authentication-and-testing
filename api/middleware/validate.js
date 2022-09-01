const auth = require('../auth/auth-model');

module.exports = {
    uniqueUsername,
    shape,
    getUsername, 
    userCheck
};

async function uniqueUsername(req, res, next) {
    const { username } = req.body;
    let result = await auth.findBy({ username });
    if (result) return res.status(404).json({ message: 'username taken' })
    console.log(result)
    next()
}
async function getUsername(req, res, next) {
    const { username } = req.body;
    let result = await auth.findBy({ username });
    if (!result) return res.status(404).json({ message: 'does not exist' })
    req.user = result;
    next()
}


async function userCheck(req, res, next){
    const { username } = req.body;
    let result = await auth.findBy({ username });
    if (!result) return res.status(404).json({ message: 'invalid credentials' }) 
    next()
}

function shape(req, res, next) {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: "username and password required" });
    next();
};