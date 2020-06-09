const generateUniqueId = require('../utils/genereteUniqueId')
const connection = require('../database/connection')
const enviar = require('../utils/email')

module.exports = {

    async index(req, res){

        const usuario = await connection.query('select * from usuario')
    
        return res.json(usuario.rows)
    },

    async create(req, res){
        const {nome, email, telefone, cidade, uf} = req.body

        const id = generateUniqueId()

        const values = [id, nome, email, telefone, cidade, uf]

        const query = 'insert into usuario ("id", "nome", "email", "telefone", "cidade", "uf") values ($1, $2, $3, $4, $5, $6)'

        await  connection.query(query, values, function(err){
            if (err) return console.log("erro")
        })

        enviar.sendMail({
            from: 'Be The Hero <gustavoemanuel901@gmail.com>',
            to: email,
            subject: 'Bem Vindo ao Be the Hero',
            html: `Olá ${nome}, Seja Bem Vindo ao Be The Hero <br> Seu Id de Acesso é <b>${id}</b>`
        }).then(message =>{
            console.log(message)
        }).catch(err =>{
            console.log(err)
        })


        return res.json({id})
    },

    async update(req, res ){
        const { id } = req.params
        const {nome, email, telefone, cidade, uf } = req.body;

        const values = [nome, email, telefone, cidade, uf]

        const query = `update usuario set nome = $1, email = $2, telefone = $3, cidade = $4, uf = $5  where id='${id}'`

        await connection.query(query, values, (err) =>{
            if (err) return console.log("erro")
        })

        return res.status(200).json({Success: 'Atualizado com sucesso'})
    },

    async delete(req, res){
        const { id } = req.params

        const Useid = req.headers.authorization

        const use = await (await connection.query(`select id from usuario where id='${id}'`)).rows

        for (let x of use){
            if(x.id !== Useid){
                return res.status(401).json({error: 'Operation not permited'})
            }
        }

        await connection.query(`delete from usuario where id='${id}'`)

        return res.status(200).send()
    }

}