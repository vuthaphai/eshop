const { config } = require('dotenv');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv/config');

const api = process.env.API_URL;

//Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

app.get(`${api}/products`,(req, res) =>{
    const product = {
        id:1,
        name: 'hair dresser',
        image: 'some_url',
    };
    res.send(product);
})

app.post(`${api}/products`,(req, res) =>{
    const newProduct = req.body;
    console.log('product: ',newProduct);    
    res.send(newProduct);
})

// mongoose.connect(process.env.CONNECT_STRING_DB, {
//     useUnifiedTopology: true,
//     dbName: 'dbeshop'
// })
// .then ( ()=> {
//     console.log('Database connection is ready!...')
// })
// .catch((err)=>{
//     console.log(err);
// }) ;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.CONNECT_STRING_DB, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });
  async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("dbeshop").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

app.listen(3000, ()=>{
    console.log('Server is running http://localhost:3000');
})