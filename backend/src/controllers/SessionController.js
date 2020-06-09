const connection = require('../database/connection')

module.exports = {
    async create(req, res){
        const { id } = req.body

        const query = `select * from ongs where id='${id}'`

        const ongs = (await connection.query(query)).rows

        //console.log(ongs)

        if(ongs.length == 0){
           res.status(400).json({error: 'No ONG found with this ID'})
           
        }

        res.json(ongs)
    }
}