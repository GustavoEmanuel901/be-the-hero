const Pool = require('pg').Pool

const connection = new Pool({
    user: 'postgres',
    password: 'xxxxxxx',
    host: 'localhost',
    port: 5432,
    database: 'academia'
})

module.exports = connection