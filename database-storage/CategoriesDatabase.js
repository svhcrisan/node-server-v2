const uuidv4 = require("uuidv4");

class NotFoundError extends Error { }

class BadRequestError extends Error { }

class CategoriesDatabase {
    constructor(client) {
        this.client = client;
    }

    async readCategory(id) {
        const item = await this.client.findById(id);

        if (undefined === item) {
            throw new BadRequestError(`Product with id ${id} was not found.`);
        }

        return item;
    }

    async readCategories(params) {
        return await this.client.read(params);
    }

    async createCategory(item) {
        item.id = uuidv4();
        return await this.client.create(item);
    }

    async deleteCategory(id) {
        const deletedItem = await this.client.delete(id);

        if (null === deletedItem) {
            throw new NotFoundError(`Category with id ${id} was not found.`);
        }

        return deletedItem;
    }

    async updateCategory(id, item) {
        const updatedItem = await this.client.update(id, item);

        if (null === updatedItem) {
            throw new BadRequestError(`Category with id ${id} was not found.`);
        }
    }
}

module.exports = { CategoriesDatabase, NotFoundError, BadRequestError };