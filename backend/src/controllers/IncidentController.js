const connection = require('../database/connection')
const generateUniqueId = require('../utils/genereteUniqueId')

module.exports = {
    async index(req, res){
        const {page = 1} = req.query

        const count = await connection.query('select count(*) from incidents')

        let num = count.rows

        for (let x of num){
            res.header("X-Total-Count", x.count)
        }

        const incidents = await connection.query(`select * from incidents inner join ongs on (ongs.id = incidents.ong_id) limit 5 offset ${(page - 1) * 5}`)

        return res.json(incidents.rows)
    },

    async create(req, res) {
        const {title, description, value } = req.body;
        const ong_id = req.headers.authorization
        const id = generateUniqueId()

        const values = [id,title,description,value, ong_id]

        const query = 'insert into incidents ("id", "title", "description", "value", "ong_id") values ($1,$2,$3,$4,$5)'

        await connection.query(query, values, (err) =>{
            if (err) return console.log("erro")
        })

        return res.json({id})
    },

    async delete(req, res){
           const { id } = req.params
        
            const ong_id = req.headers.authorization

        //console.log(ong_id, id)
        

           const incident = await (await connection.query(`select ong_id from incidents where id='${id}'`)).rows

        //console.log(incident)

           for (let x of incident){
               if(x.ong_id != ong_id){
                   return res.status(401).json({error: 'Operation not permitted' })
               }
           }

           await connection.query(`delete from incidents where id='${id}'`)

           return res.status(204).send()

    }
}