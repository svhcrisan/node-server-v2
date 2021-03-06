const ClientFile = require("../database-storage/clients/ClientFile");
const { ProductsDatabase, NotFoundError, BadRequestError } = require("../database-storage/ProductsDatabase");
const path = require("path");
const fileClient = new ClientFile(
    path.resolve(__dirname, "../data/products.json")
);
const dao = new ProductsDatabase(fileClient);

const getProduct = async (req, res) => {
    const id = req.params.id; //id got from route

    try {
        const product = await dao.readProduct(id);

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof BadRequestError) {

            return res.status(400).end(error.message);
        }

        res.status(500).end(error.message);
    }
}

const getProducts = async (req, res) => {
    const params = req.query; //req.params

    const products = await dao.readProducts(params);

    res.status(200).json(products);
};

const createProduct = async (req, res) => {
    const product = req.body;

    const newProduct = await dao.createProduct(product);

    res.status(201).json(newProduct);
}

const deleteProduct = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).end('"id" is missing from the params!');
    }

    try {
        await dao.deleteProduct(id);
        res.status(204).end();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).end(error.message);
        }

        res.status(500).end(error.message);
    }

}

const updateProduct = async (req, res) => {
    const id = req.query.id;
    const item = req.body;

    try {
        const updatedItem = await dao.updateProduct(id, item);

        res.status(200).json(updatedItem);
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).end(error.message);
        }
        res.status(500).end(error.message);
    }
}


module.exports = { getProducts, createProduct, deleteProduct, updateProduct, getProduct };