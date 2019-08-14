const router = require("express").Router();
const { getProducts } = require("../controllers/products");
router.get("/products", getProducts);


module.exports = router;