import { Router } from 'express'
import ProductManager from '../components/productManager.js';

const router = Router()
const productMngr = new ProductManager ()
const products = []


const report = (req, res, next) => {
    console.log(`Ahora: ${new Date().toLocaleString()}`)
    next()
}

// Listar todos los productos de la base

router.get('/', report, (req, res) => {
    try {
      const products = parseInt(req.query.limit)
      if(!products) {
        return res.status(200).json( managerProduct.getProducts())
      }
      const allProducts =  managerProduct.getProducts()
      const limitProduct = allProducts.slice(0, products)
    
      return res.status(200).json(limitProduct)
    } catch (err) {
      return console.error(err)
    }
  })


// Traer solo los productos con el ID proporcionado

router.get('/:pid', async (req, res) => {
    try{
        const pid = parseInt(req.params.pid)
        if (!pid) {
            return res.status(404).json('Producto no encontrado')
        }
        const allProducts = await managerProduct.getProducts()
        const productById = allProducts.find(p => p.id === pid)

        res.status(200).json(productById)

    }   catch (err) {
    return console.error(err)
  }
})


// Agregar un nuevo producto 


router.post('/', (req, res) => {
    const newProduct = req.body
    products.push(newProduct)
    res.status(200).send(productMngr.addProduct(newProduct))

})

// Updatear un producto 

router.put('/pid:', (req, res) => {
    try {
    let id= req.params.pid;
    let updateProduct = req.body;
    res.status(200).send(id, updateProduct)
} catch(err) {
    return console.error(err)
}
})


// Deletear un producto

router.delete('/pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid)
        const productDeleted = await productMngr.deleteProduct(pid)
        res.status(200).json(productDeleted)
    }
    catch (err){
        return console.error(err)
    }
})

export default router
