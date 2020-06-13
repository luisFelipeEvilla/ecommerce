import express from 'express';
import data from './data';
import chalk from 'chalk';

const app = express();
const PORT = 5000;

app.get("/api/products", (req, res) => {
    res.send(data.products);
})

app.listen(5000, () => {
    console.log(`server it's listenning at ${chalk.green('http://localhost:' + PORT)}`)
}) 