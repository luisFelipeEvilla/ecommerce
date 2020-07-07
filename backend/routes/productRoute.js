const router = require("express").Router();
const Product = require("../models/productModel");
const upload = require("../middlewares/multer");
const { isAuth, isAdmin } = require("../utils/authentication");
const { deleteImage } = require("../utils/images");
const { fromString } = require("uuidv4");

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

router.post("/", isAuth, upload.single("image"), isAdmin, async (req, res) => {
  try {
    const url = req.protocol + "://" + req.get("host");

    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      image: url + "/uploads/" + req.file.filename,
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

router.put("/:id", isAuth, isAdmin, upload.single("image"), async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
      let oldImage;

      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        // if the user upload a new image update it
        if (req.file) {
          oldImage = product.image;

          const url = req.protocol + "://" + req.get("host");
          product.image = url + "/uploads/" + req.file.filename;
        }
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;

        await product.save((error, p) => {
          if (error) {
            return error;
          } else {
            // if the user upload a new image delete the old
            if (req.file) {
              deleteImage(oldImage, res);
            }
            return res
              .status(200)
              .send({ message: "Product updated", data: p._id });
          }
        });
      } else {
        return res
          .status(404)
          .send({ message: "Error product not found", data: productId });
      }
    } catch (error) {
        return res.status(500).send({ message: "Error Deleting Product" });
    }
  }
);

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (product) {
      await product.remove((error, p) => {
        if (error) {
          return error;
        } else {
          deleteImage(p.image, res);
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
    console.log("hola2");
    if (error.code && error.code === "ENOENT") {
      console.log("hola1");
      return res
      .status(200)
      .send({ message: "Product Deleted", data: p._id });
    } else {
      return res.status(500).send({ message: "Error Deleting Product" });
    }
  }
});

module.exports = router;
