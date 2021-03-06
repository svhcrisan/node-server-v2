const uuidv4 = require("uuidv4");

class NotFoundError extends Error { }

class BadRequestError extends Error { }

class ProductsDatabase {
    constructor(client) {
        this.client = client;
    }

    async readProduct(id) {
        const item = await this.client.findById(id);

        if (undefined === item) {
            throw new BadRequestError(`Product with id ${id} was not found.`);
        }

        return item;
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
            throw new NotFoundError(`Product with id ${id} was not found.`);
        }

        return deletedItem;
    }

    async updateProduct(id, item) {
        const updatedItem = await this.client.update(id, item);

        if (null === updatedItem) {
            throw new BadRequestError(`Product with id ${id} was not found.`);
        }
    }
}

module.exports = { ProductsDatabase, NotFoundError, BadRequestError };