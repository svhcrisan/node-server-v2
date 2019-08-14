const ClientFile = require("../database-storage/clients/ClientFile");
const ProductsDatabase = require("../database-storage/ProductsDatabase");
const path = require("path");

const fileClient = new ClientFile(
    path.resolve(__dirname, "../data/products.json")
);

const dao = new ProductsDatabase(fileClient);

exports.getProducts = async (req, res) => {
    const params = {
        id: '',
        name: '',
        description: '',
        price: '',
        categories: '',
        rating: '',
        manufacturerId: '',
        img: ''
    }
    const products = await dao.readProducts(params);
    //console.log(products);
    res.status(200).json({ products });
};