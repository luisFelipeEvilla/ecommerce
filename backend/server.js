const express = require('express');
const data = require('./data');
const chalk = require ('chalk');
require('dotenv').config();
const config = require ('./config');
const mongoose = require ('mongoose');
const userRoute = require ('./routes/userRoute');
const bodyParser = require ('body-parser');
const mongodbUrl = config.MONGODB_URL;

try {
    mongoose.set('useCreateIndex', true);
    mongoose.connect(mongodbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log(chalk.green("connection successfully established to the database"));
} catch (error) {
    console.log(error)
}

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use("/api/users", userRoute);

app.get("/api/products/:id", (req, res) => {
    const productId = req.params.id;
    const product = data.products.find(x => x._id === productId);
    
    if (product) {
        res.send(product);
    } else {
        res.status(404).send({ msg: "Product Not Found."})
    }
})

app.get("/api/products", (req, res) => {
    res.send(data.products);
})

app.listen(5000, () => {
    console.log(`server it's listenning at ${chalk.green('http://localhost:' + PORT)}`)
}) 