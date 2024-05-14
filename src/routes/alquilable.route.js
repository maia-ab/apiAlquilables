const {Router} = require('express');
const db = require('../db/models')

const route = Router();


route.get('/alquilable', async (req, res)=>{
    const alquilables = await db.Alquilable.findAll({});
    res.status(200).json(alquilables)
  })
  
route.get('/alquilable/:id', async (req, res)=>{
    const idAlquilabe = req.params.id;
    const alquilable = await db.Alquilable.findOne(
      {
        where: {id: idAlquilabe},
        include: ['registros']
      })
    res.status(200).json(alquilable)
})

module.exports = route