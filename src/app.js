const express = require('express')
const data = require('../data/data.json')
const db = require('./db/models')


const _ = require('lodash');
const app = express();
app.use(express.json())

app.get('/alquilable', async (req, res)=>{
  const alquilables = await db.Alquilable.findAll({});
  res.status(200).json(alquilables)
})

app.get('/alquilable/:id', async (req, res)=>{
  const idAlquilabe = req.params.id;
  const alquilable = await db.Alquilable.findOne(
    {
      where: {id: idAlquilabe}, 
      attributes:['id','descripcion','disponible', 'precio']
    })
  res.status(200).json(alquilable)
})

app.delete('/alquilable/:id', async (req, res)=>{
   const id = req.params.id;
   const row = await db.Alquilable.destroy({where: {id}})
   if(row) {
    res.status(200).json(`El alquilable con id ${id} se borro con exito.`)
   } else {
    res.status(404).json(`El alquilable con id ${id} no existe.`)
   }
})

app.post('/alquilable',async (req, res)=>{
    try {
      const alquilabe = req.body
      const newRercord = await db.Alquilable.create(alquilabe)
      res.status(201).json(newRercord)
    } catch (err) {
      res.status(500).json(err.message)
    }
})

app.put('/alquilable/:id', (req, res)=>{
  const id = req.params.id;
  const idx = data.findIndex( e => e.id == id)
  if (idx >=0) {
    data[idx] = {id: Number(id), ...req.body}
    res.status(200).json(data[idx])
  } else
    res.status(404).json({error: `El id ${id} no existe.`})
})


app.listen(3000, async ()=>{
  console.log(`La aplicacion arranco correctamente en el puerto 3000`);
  try {
     await db.sequelize.authenticate()
     await db.sequelize.sync({force:true});

     db.Alquilable.create({
      descripcion: 'Castillo Inflable',
      disponible: true,
      precio: 1200
     })

     db.Alquilable.create({
      descripcion: 'Toro Mecanico',
      disponible: true,
      precio: 1230
     })

  } catch(err){
    console.log(err)
  }

        
      

})