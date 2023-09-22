require('dotenv').config()

const connectDB = require("./db/connect.js")

const Product = require("./models/product.js")

const jsonProducts = require("./products.json")


const start = async ()=>{
    try {
        await connectDB()
        await Product.deleteMany()
        await Product.create(jsonProducts)
        console.log("Success");
        process.exit(0)  // 0 means everything went well and we are just exiting the process
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

start()
    