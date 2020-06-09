const connection = require('../database/connection')

module.exports = {

    async index(req, res){

        const {search} = req.params

        const {page = 1} = req.query

        const count = await connection.query('select count(*) from ongs')

        let num = count.rows

        for (let x of num){
            res.header("X-Total-Count", x.count)
        }

        const ongs = await connection.query(`select * from ongs where "name" like '%${search}%' or "city" like '%${search}%' limit 6 offset ${(page - 1) * 5}`)


      
        return res.json(ongs.rows)
    },
}