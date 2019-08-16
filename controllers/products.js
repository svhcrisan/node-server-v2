const ClientFile = require("../database-storage/clients/ClientFile");
const ProductsDatabase = require("../database-storage/ProductsDatabase");
const path = require("path");
const fileClient = new ClientFile(
    path.resolve(__dirname, "../data/products.json")
);
const dao = new ProductsDatabase(fileClient);

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

    await dao.deleteProduct(id);

    res.status(200).json({ message: "deleted." });
}

const updateProduct = async (req, res) => {
    const id = req.query.id;
    const item = req.body;

    await dao.updateProduct(id, item);

    res.status(200).json({ message: "updated." });

    // console.log("THE ID-------", id);
    // console.log("THE ITEM------", item);
}


module.exports = { getProducts, createProduct, deleteProduct, updateProduct };