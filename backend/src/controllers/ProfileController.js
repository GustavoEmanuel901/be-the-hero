const connection = require('../database/connection')

module.exports = {
    async index(req, res){
        const ong_id = req.headers.authorization

        const incidents = await connection.query(`select * from incidents where ong_id='${ong_id}'`)

        res.json(incidents.rows)
    }
}