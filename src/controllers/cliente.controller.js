const {Cliente} = require('../db/models')

const controller = {}

const getAllUser = async (req, res) => {
    res.status(200).json(await clienteModel.findAll({}))
}

controller.getAllUser = getAllUser

const crearCliente = async (req, res) => {
    const cliente = await db.Cliente.create(req.body)
    res.status(201).json(cliente)
}

controller.crearCliente = crearCliente

const clienteById = async (req, res) => {
    const idCliente = req.params.id
    res.status(200).json(await Cliente.findByPk(id))
}

controller.clienteById = clienteById

modules.exports = controller