const ClientFile = require("../database-storage/clients/ClientFile");
const { CategoriesDatabase, NotFoundError, BadRequestError } = require("../database-storage/CategoriesDatabase");
const path = require("path");
const fileClient = new ClientFile(
    path.resolve(__dirname, "../data/categories.json")
);
const dao = new CategoriesDatabase(fileClient);

const getCategory = async (req, res) => {
    const id = req.params.id; //id got from route

    try {
        const product = await dao.readCategory(id);

        res.status(200).json(product);
    } catch (error) {
        if (error instanceof BadRequestError) {

            return res.status(400).end(error.message);
        }

        res.status(500).end(error.message);
    }
}

const getCategories = async (req, res) => {
    const params = req.query; //req.params

    const products = await dao.readCategories(params);

    res.status(200).json(products);
};

const createCategory = async (req, res) => {
    const product = req.body;

    const newProduct = await dao.createCategory(product);

    res.status(201).json(newProduct);
}

const deleteCategory = async (req, res) => {
    const id = req.query.id;

    if (!id) {
        return res.status(400).end('"id" is missing from the params!');
    }

    try {
        await dao.deleteCategory(id);
        res.status(204).end();
    } catch (error) {
        if (error instanceof NotFoundError) {
            return res.status(404).end(error.message);
        }

        res.status(500).end(error.message);
    }

}

const updateCategory = async (req, res) => {
    const id = req.query.id;
    const item = req.body;

    try {
        const updatedItem = await dao.updateCategory(id, item);

        res.status(200).json(updatedItem);
    } catch (error) {
        if (error instanceof BadRequestError) {
            return res.status(400).end(error.message);
        }
        res.status(500).end(error.message);
    }
}


module.exports = { getCategories, getCategory, createCategory, deleteCategory, updateCategory };