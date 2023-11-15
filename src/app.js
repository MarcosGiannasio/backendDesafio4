import express from 'express'
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import productsRouter from './routes/products.routes.js'
import cartsRouter from './routes/carts.routes.js'
import { __dirname } from './utils.js'
import viewsRouter from './routes/views.routes.js'
import ProductManager from "./components/productManager.js"



const PORT = 2090
const productManager = new ProductManager("/files/products.json")
const app = express()

const httpServer = app.listen(PORT, () => {
    console.log(`Servicio activo en puerto ${PORT}`)
})

const socketServer = new Server(httpServer)
app.use((err, req, res, next) => {
    console.log(err.stack)
    res.status(500).send('Ha ocurrido un error')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)


app.use('/static', express.static(`${__dirname}/public`))

socketServer.on('connection', async (socket) => {
    console.log('Cliente conectado con id:', socket.id)
    const productsArray = await productManager.getProducts({})
    socketServer.emit('enviarproducts', productsArray)

    socket.on('addProduct', async (obj) => {
        await productManager.addProduct(obj)
        const updatedProducts = await productManager.getProducts({})
    socketServer.emit('productsupdated', updatedProducts)
    })

    socket.on('deleteProduct', async (id) => {
        await productManager.deleteProductById(id)
        const newProductList = await productManager.getProducts({})
    socketServer.emit('productsupdated', newProductList)
    })
})