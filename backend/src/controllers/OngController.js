const generateUniqueId = require('../utils/genereteUniqueId')
const connection = require('../database/connection')
const enviar = require('../utils/email')

module.exports = {

    async index(req, res){

        const {page = 1} = req.query

        const count = await connection.query('select count(*) from ongs')

        let num = count.rows

        for (let x of num){
            res.header("X-Total-Count", x.count)
        }

        const ongs = await connection.query(`select * from ongs limit 6 offset ${(page - 1) * 5}`)

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

        enviar.sendMail({
            from: 'Be The Hero <gustavoemanuel901@gmail.com>',
            to: email,
            subject: 'Bem Vindo ao Be the Hero',
            html: `Olá ${name}, Seja Bem Vindo ao Be The Hero<br> Seu Id de Acesso é <b>${id}</b>`
        }).then(message =>{
            console.log(message)
        }).catch(err =>{
            console.log(err)
        })

        return res.json({id})
    },

    async update(req, res ){
        const { id } = req.params
        const {name, email, whatsapp, city, uf } = req.body;
        //const ong_id = req.headers.authorization

      /*  const ongs = await (await connection.query(`select id from ongs where id='${id}'`)).rows

        for (let x of ongs){
            if(x.id !== ong_id){
                return res.status(401).json({error: 'Operation not permited'})
            }
        }*/

        const values = [name, email, whatsapp, city, uf]

        const query = `update ongs set name = $1, email = $2, whatsapp = $3, city = $4, uf = $5  where id='${id}'`

        await connection.query(query, values, (err) =>{
            if (err) return console.log("erro")
        })

        return res.status(200).json({Success: 'Atualizado com sucesso'})
    },

    async delete(req, res){
        const { id } = req.params

        await connection.query(`delete from ongs where id='${id}'`)

        return res.status(204).send()

 },
}