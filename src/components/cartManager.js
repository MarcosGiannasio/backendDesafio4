import fs from 'fs'
import ProductManager from './productManager.js'

const productAll = new ProductManager
class cartManager {
          constructor() {
                    this.path = "./src/components/carts.json"
          }

readCarts = async () =>{
          let carts = await fs.readFile(this.path, "utf-8");
          return JSON.parse(carts)
};

writeCarts = async (cart) => {
          await fs.writeFile(this.path, JSON.stringify(cart))
};

exist = async (id) => {
          let carts = await this.readCarts();
          return carts.find(cart => cart.id === id)
}

// generar id autoincrementable

generateCartId = async () => {
          try {
              if (fs.existsSync(this.path)) {
                  const cartList = await this.readCarts()
                  const counter = cartList.length
                  if (counter == 0) {
                      return 1
                  } else {
                      return cartList[counter - 1 ].id + 1
                  }
              }
          } catch (err) {
              return console.error(err)
          }
      }

// agregar carrito 

addCarts = async () => {
          let cartsOld = await this.readCarts();
          let id = this.generateCartId
          let cartsConcat = [{id : id, products : []}, ...cartsOld]
          await this.writeCarts(cartsConcat)

          return "Carrito Agregado"
}

// listar carrito segun id

getCartsById = async (id) => {
          let cartById = await this.exist(id)
          if(!cartById) return "Carrito no encontrado"
          return cartById
};

// agregar producto al carrito


addProductInCart = async (cartId, productId) => {
          let cartById = await this.exist(id)
          if(!cartById) return "Carrito no encontrado"
          let productById = await productAll.exist(productId)
          if(!productById) return "Producto no encontrado"

          let cartsAll = await this.readCarts()
          let cartFilter  = cartsAll.filter(cart => cart.id != cartId)


          if(cartById.products.some(prod => prod.id === productId)){
                    let moreProductInCart = cartById.products.find(prod => prod.id === productId)
                    moreProductInCart.quantity ++
                    let cartsConcat = [productInCart, ...cartFilter]
                    await this.writeCarts(cartsConcat)
                    return "Producto sumado al carrito (se añadió cantidad)"
          }
          cartById.products.push({ id:productById.id, quantity:1 })
          let cartsConcat = [cartById, ...cartFilter]
          await this.writeCarts(cartsConcat);
          return "Producto agregado al carrito"
};

}




export default cartManager