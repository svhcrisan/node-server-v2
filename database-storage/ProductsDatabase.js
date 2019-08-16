const uuidv4 = require("uuidv4");

class NotFoundError extends Error { }

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
        const deletedItem = await this.client.delete(id);

        if (null === deletedItem) {
            throw new NotFoundError(`Product with id${id} was not found`);
        }

        return deletedItem;
    }

    async updateProduct(id, item) {
        return await this.client.update(id, item);
    }
}

module.exports = { ProductsDatabase, NotFoundError };