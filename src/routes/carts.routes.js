import { Router } from 'express';
import { uploader } from '../uploader.js';
import cartManager from '../components/cartManager.js';

const router = Router()
const carts = new cartManager


router.post('/', uploader.single('avatar'),async  (req, res)=> {

    res.status(200).send(await carts.addCarts)
})




router.get('/', async (req, res) => {
    res.status(200).send(await carts.readCarts())
})


router.get('/:id', async (req, res) => {
    res.status(200).send(await carts.getCartsById(req.params.id))
})


router.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid
    let productId = req.params.pid
    res.status(200).send(await carts.addProductInCart(cartId, productId))
})




export default router
