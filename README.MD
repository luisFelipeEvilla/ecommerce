# Description
this is a ecommerce website developed by Luis Evilla :

## Technologies:

### Backend
* Node.
* Express.
* Mongodb, connected with mongoose.

### Frontend

* React.
* Redux.

## Installation
Visite the repository on [GitHub](https://github.com/luisFelipeEvilla/ecommerce) and download the source code.

Go to the root directory and run npm install, and will install all the backend
dependencies.

Go to frontend directory and rum npm install, and will will install all the
backend dependencies.

## Setup

the app need of three enviroment variables. These can be provided, via a .env
file in the root directory of the repository, or supply manually before launching the application.

#### variables:

1. MONGODB_URL: this will be the url to connect to the mongodb database. By default this will be 'mongodb://localhost/amazona'
1. PORT: the port for the node server to listen request. By default
this will be port 5000.
1. JWT_SECRET: the JWT secret key to generate authentication tokens. By default
this will be 'anySecretKey'.

**all this configuration can be over written in the config.js file in the backend/utils directory**

## Run application.

for run this application on development enviroment, only need two terminal shell and
follow the next steps.

go to the project root directy and execute.
```console
foo@bar:~$ npm run dev
```

the above command will start the server.

```console
foo@bar:~$ npm start 
```

the last command will launch the frontend app, listenning on port localhost:3000.
