const connection = require('../database/connection');

module.exports = {
    async create(req, res){
        const { id } = req.body

        const query = `select * from usuario where id='${id}'`

        const use = (await connection.query(query)).rows

        if(use.length == 0){
           res.status(400).json({error: 'No ONG found with this ID'})
           
        }

        res.json(use)
    }
}