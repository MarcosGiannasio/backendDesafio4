import fs from 'fs';

class ProductManager {
    constructor(Path) {
        this.path = Path;
    }

    async addProduct(product) {
        const products = this.getProducts();
        product.id = this.generateUniqueId(products);
        products.push(product);
        this.saveProducts(products);
        return product;
    }

    async getProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
            return [];
        }
        catch{}
    } 

    async getProductById(id) {
        const products = this.getProducts();
        const productById = products.find((p) => p.id === id);
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        return productById;
    }

   async  updateProduct(id, updatedProduct) {
        const products = this.getProducts();
        const productIndex = products.findIndex((p) => p.id === id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado');
        }
        products[productIndex] = { ...products[productIndex], ...updatedProduct };
        this.saveProducts(products);
    }

    async deleteProduct(id) {
        const products = this.getProducts();
        const updatedProducts = products.filter((p) => p.id !== id);
        if (products.length === updatedProducts.length) {
            throw new Error('Producto no encontrado');
        }
        this.saveProducts(updatedProducts);
    }

    async generateUniqueId(products) {
        const ids = products.map((p) => p.id);
        let newId = 1;
        while (ids.includes(newId)) {
            newId++;
        }
        return newId;
    }

    async saveProducts(products) {
        fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
    }
}

export default ProductManager;