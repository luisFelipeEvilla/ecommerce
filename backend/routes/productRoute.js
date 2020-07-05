const router = require('express').Router();
const Product = require('../models/productModel');
const { isAuth, isAdmin } = require('../utils');

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        return res.send(products);
    } catch (error) {
        return res.status(500);
    }
})

router.get("/:id", async (req, res) => {
    const productId = req.params.id;

    try {
        const product = await Product.findOne({
            _id: productId
        })
        if (product) {
            return res.send(product);
        } else {
            return res.status(404).send({ msg: "Product Not Found." })
        }
    } catch (error) {
        return res.status(500).send(error);
    }
})

router.post('/', isAuth, async (req, res) => {
    try {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            brand: req.body.brand,
            category: req.body.category,
            countInStock: req.body.countInStock,
            description: req.body.description,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
        });
        const newProduct = product.save((error, p) => {
            if (error) {
                return error
            } else {
                return res.status(201).send({ message: 'New Product Created', data: p._id })
            }
        });
    } catch (error) {
        return res.status(500).send({ message: 'Error Creating Product' });
    }
})

module.exports = router;