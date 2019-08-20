const router = require("express").Router();
const { getProducts, getProduct, createProduct, deleteProduct, updateProduct } = require("../controllers/products");
const { getCategories, getCategory, createCategory, deleteCategory, updateCategory } = require("../controllers/categories");

//products
router.get("/products", getProducts);

router.get("/products/:id", getProduct);

router.post("/products", createProduct);

router.delete("/products", deleteProduct);

router.put("/products", updateProduct);

// categories
router.get("/categories", getCategories);

router.get("/categories/:id", getCategory);

router.post("/categories", createCategory);

router.delete("/categories", deleteCategory);

router.put("/categories", updateCategory);


module.exports = router;
