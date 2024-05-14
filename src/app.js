const express = require('express')
const data = require('../data/data.json')
const db = require('./db/models')
const clienterouter = require('./routes/cliente.route')
const alquilablerouter = require('./routes/alquilable.route')


const _ = require('lodash');
const app = express();
app.use(express.json());
app.use(clienterouter);
app.use(alquilablerouter);



app.delete('/alquilable/:id', async (req, res)=>{
   const id = req.params.id;
   const row = await db.Alquilable.destroy({where: {id}})
   if(row) {
    res.status(200).json(`El alquilable con id ${id} se borro con exito.`)
   } else {
    res.status(404).json(`El alquilable con id ${id} no existe.`)
   }
})


app.delete('/alquilable/:idAlquilable/registro/:idRegistro', async (req, res)=>{
  const idAlquilabe = req.params.idAlquilable;
  const idRegistro = req.params.idRegistro
  const row = await db.Registro.destroy({where: {id: idRegistro, rentable_id:idAlquilabe}})
  if(row) {
   res.status(200).json(`El registro con id ${idRegistro} se borro con exito del aquilable con id ${idAlquilabe}.`)
  } else {
   res.status(404).json(`El registro con id ${idRegistro} no se encontro en el aquilable con id ${idAlquilabe}.`)
  }
})




app.delete('/registro/:id', async (req, res)=>{
  const id = req.params.id;
  const row = await db.Registro.destroy({where: {id}})
  if(row) {
   res.status(200).json(`El registro con id ${id} se borro con exito.`)
  } else {
   res.status(404).json(`El registro con id ${id} no existe.`)
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

app.post('/alquilable/:id/registro', async (req, res) =>{
  const idAlquilabe = req.params.id;
  const alquilable = await db.Alquilable.findByPk(idAlquilabe)
  if(alquilable){
    const registro = req.body
    const newRercord = await db.Registro.create({ rentable_id:alquilable.id, ...registro})
    res.status(201).json(newRercord)
  } else {
    res.status(404).json({error: `El id ${idAlquilabe} no existe como alquilable.`})
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
    //Verifica si se pudo conectar bien a la base de datos
     await db.sequelize.authenticate()
     // El método sync solo se usa en ambientes de desarrollo. No utilizar en produccion.

     await db.sequelize.sync({force:true});
  


     db.Alquilable.create({
      descripcion: 'Castillo Inflable',
      disponible: true,
      precio: 1200,
      registros:[
        {
          fecha: new Date('2024-01-05'),
          abono: true,
          cliente
        },
        {
          fecha: new Date('2024-03-15'),
          abono: false,
          cliente
        },
        {
          fecha: new Date('2024-03-17'),
          abono: false,
          cliente
        },

      ]
     }, {include:['registros']})

     db.Alquilable.create({
      descripcion: 'Toro Mecanico',
      disponible: true,
      precio: 1230
     })

  } catch(err){
    console.log(err)
  }

        
      

})