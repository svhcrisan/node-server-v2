class ProductsDatabase {
    constructor(client) {
        this.client = client;
    }

    async readProducts(params) {
        return await this.client.read(params);
    }
}

module.exports = ProductsDatabase;