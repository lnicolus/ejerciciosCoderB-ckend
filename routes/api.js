import express from 'express'
import { io } from '../server.js'
import { mariadb } from '../dbHandler/dbConnection.js'
import dbController from '../dbHandler/dbControllers.js'
const products = new dbController(mariadb, 'products')
const api = express.Router()

api.use(function (req, res, next) {
    if (req.originalUrl === '/api/products/:id') {
        if (req.method === 'POST') { req.method = 'PUT' }
    }
    next()
})

let option = true
api.use(function (req, res, next) {
    io.on('connection', socket => {
        socket.emit('input-res', option)
        socket.on('input-req', data => {
            option = data
        })
    })
    next()
})

api.get('/', (_, res) => {
    let title = 'Database with chat'
    products.getAll()
        .then(productsAll => res.render('index', { title, option, productsAll }) ||
            { error: 'Error' })
})

api.get('/api/products/:id', async (req, res) => {
    const { id } = req.params
    const result = await products.getById(Number(id))
    res.send(result ||
        { error: "item not found" })
})

api.post('/api/products', (req, res) => {
    const nuevoProd = req.body
    products.save(nuevoProd)
    res.redirect('/')
})

api.put('/api/products/:id', (req, res) => {

    products.modifyById(req.body)
    res.redirect('/')
})

api.delete('/api/products/:id', async (req, res) => {
    const { id } = req.params
    const msg = await products.deleteById(Number(id))
    res.send(msg || { error: 'item not found' })
})

export default api