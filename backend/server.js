const express = require('express');
const data = require('./data');
const chalk = require ('chalk');
const morgan = require('morgan');
require('dotenv').config();
const config = require ('./config');
const mongoose = require ('mongoose');
const productRoute = require('./routes/productRoute');
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
    process.exit(1);
}

const app = express();
const PORT = 5000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use('/api/products', productRoute);

app.listen(5000, () => {
    console.log(`server it's listenning at ${chalk.green('http://localhost:' + PORT)}`)
}) 