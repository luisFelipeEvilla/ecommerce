const router = require("express").Router();
const Product = require("../models/productModel");
const { isAuth, isAdmin } = require("../utils");

// get all products

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    return res.send(products);
  } catch (error) {
    return res.status(500);
  }
});

// get specific product

router.get("/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({
      _id: productId,
    });

    if (product) {
      return res.status(200).send(product);
    } else {
      return res.status(404).send({ message: "Product Not Found." });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "There was an error on the server" });
  }
});

// create new product

router.post("/", isAuth, isAdmin, async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      countInStock: req.body.countInStock,
      description: req.body.description,
    });

    product.save((error, p) => {
      if (error) {
        return error;
      } else {
        return res
          .status(201)
          .send({ message: "New Product Created", data: p._id });
      }
    });
  } catch (error) {
    return res.status(500).send({ message: "Error Creating Product" });
  }
});

// update product

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      product.name = req.body.name;
      product.price = req.body.price;
      product.image = req.body.image;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;

      await product.save((error, p) => {
        if (error) {
          return error;
        } else {
          return res
            .status(200)
            .send({ message: "Product updated", data: p._id });
        }
      });
    } else {
      console.log(error);
      return res
        .status(404)
        .send({ message: "Error product not found", data: productId });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error updating Product"});
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      await product.remove((error, p) => {
        if (error) {
          return error;
        } else {
          return res
            .status(200)
            .send({ message: "Product Deleted", data: p._id });
        }
      });
    } else {
      return res
        .status(404)
        .send({ message: "Error product not found", data: productId });
    }
  } catch (error) {
    return res.status(500).send({ message: "Error Deleting Product"});
  }
});

module.exports = router;
