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

        const ongs = await connection.query(`select i.id, i.title, i.description, i.value, o.name, o.email, o.whatsapp from incidents 
            as i inner join ongs as o on (o.id = i.ong_id)
            where o.name like '%${search}%' or i.title like '%${search}%' or description like '%${search}%' limit 6 offset ${(page - 1) * 5}`)

      
        return res.json(ongs.rows)
    },
}