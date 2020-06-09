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

        const incidents = await connection.query(`select i.id, i.title, i.description, i.value, o.name, o.email, o.whatsapp from incidents as i inner join ongs as o on (o.id = i.ong_id) limit 6 offset ${(page - 1) * 5}`)

        return res.json(incidents.rows)
    },

    async create(req, res) {
        const {title, description, value } = req.body;
        const ong_id = req.headers.authorization
        const id = generateUniqueId()

        const values = [id, title, description, value, ong_id]

        const query = 'insert into incidents ("id", "title", "description", "value", "ong_id") values ($1,$2,$3,$4,$5)'

        await connection.query(query, values, (err) =>{
            if (err) return console.log("erro")
        })

        return res.json({id})
    },

    async delete(req, res){
           const { id } = req.params
        
           const ong_id = req.headers.authorization

           const incident = await (await connection.query(`select ong_id from incidents where id='${id}'`)).rows

           for (let x of incident){
               if(x.ong_id != ong_id){
                   return res.status(401).json({error: 'Operation not permited'})
               }
           }

           await connection.query(`delete from incidents where id='${id}'`)

           return res.status(204).send()

    },

    async update(req, res ){
        const { id } = req.params
        const {title, description, value } = req.body;
        const ong_id = req.headers.authorization

        const incident = await (await connection.query(`select ong_id from incidents where id='${id}'`)).rows

        for (let x of incident){
            if(x.ong_id !== ong_id){
                return res.status(401).json({error: 'Operation not permited'})
            }
        }

        const values = [title, description, value]

        const query = `update incidents set title = $1, description = $2, value = $3  where id='${id}'`

        await connection.query(query, values)

        return res.status(200).json({Success: 'Atualizado com sucesso'})
    }
}