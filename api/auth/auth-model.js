const db = require('../../data/dbConfig');

module.exports = {
    findBy,
    findById,
    create
}

function findBy(filter) {
return db('users').where(filter).first();

}

function findById(id) {
    return db('users').where({ id }).first();
}

async function create(user) {
const [ id ] = await db('users').insert(user)
return findById({id})
}