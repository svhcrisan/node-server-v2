const router = require("express").Router();
const { getProducts, createProduct, deleteProduct, updateProduct } = require("../controllers/products");



router.get("/products", getProducts);

router.post("/products", createProduct);

router.delete("/products", deleteProduct);

router.put("/products", updateProduct);


module.exports = router;
