require('dotenv').config();

const variables = {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/amazona',
    PORT: process.env.PORT || 5000,
    JWT_SECRET: process.env.JWT_SECRET || 'anySecretKey'
}

module.exports = variables;