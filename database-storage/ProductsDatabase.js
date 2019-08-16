const uuidv4 = require("uuidv4");

class ProductsDatabase {
    constructor(client) {
        this.client = client;
    }

    async readProducts(params) {
        return await this.client.read(params);
    }

    async createProduct(item) {
        item.id = uuidv4();
        return await this.client.create(item);
    }

    async deleteProduct(id) {
        return await this.client.delete(id);
    }

    async updateProduct(id, item) {
        return await this.client.update(id, item);
    }
}

module.exports = ProductsDatabase;