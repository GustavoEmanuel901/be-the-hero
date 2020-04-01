const generateUniqueId = require('../utils/genereteUniqueId')
const connection = require('../database/connection')

module.exports = {

    async index(req, res){

        const ongs = await connection.query('select * from ongs')
    
        return res.json(ongs.rows)
    },

    async create(req, res){
        const {name, email, whatsapp, city, uf} = req.body

        const id = generateUniqueId()

        const values = [id, name, email, whatsapp, city, uf]

        const query = 'insert into ongs ("id", "name", "email", "whatsapp", "city", "uf") values ($1, $2, $3, $4, $5, $6)'

        await  connection.query(query, values, function(err){
            if (err) return console.log("erro")
        })

        return res.json({id})
    }
}