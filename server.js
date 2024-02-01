const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/products', async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({message: error.message})

    }
})

app.get('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)

    } catch (error) {
        res.status(500).json({message: error.message})

    }
})

app.post('/product', async(req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message: `cannot find product ${id}`})
        }
        const product1 = await Product.findById(id);
        res.status(200).json(product1)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.delete('/products/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id)
        if(!product){
            return res.status(404).json({message: `cannot find product ${id}`})
        }
        const product1 = await Product.findById(id);
        res.status(200).json(product1)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.connect('mongodb+srv://pratikrsm12:oD0IlgWUU2i0vG5V@nodeapi.q1jg29z.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    app.listen(3000, ()=>{
        console.log("qwert")
    })
    
    console.log("connected to mongo")
}).catch((error) => {
    console.log(error) 
})