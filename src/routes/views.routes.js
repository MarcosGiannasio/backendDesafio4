import { Router } from 'express'
import ProductManager from '../components/productManager.js'

const productManager = new ProductManager("/src/files/products.json")

const router = Router()

router.get('/', async (req, res) => {
    const productsList = await productManager.getProducts({})
    console.log(productsList)
    res.render('home', { productsList })
})

router.get('/realTimeProducts', (req, res) => {
    res.render('realTimeProducts')
})

export default router