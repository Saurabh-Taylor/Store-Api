require("dotenv").config()

// Async errors

const express = require("express")
const app = express()
const notFound = require('./middleware/not-found.js')
const errorMiddleware = require('./middleware/error-handler.js')
 const connectToDb = require("./db/connect.js")

 const apiRoutes = require("./routes/products.js")

 connectToDb()


// middlewares
app.use(express.json())

// routes

app.get("/",(req,res)=>{
    res.send(`<h1> Store API </h1>`)
})

app.use('/api/v1/products',apiRoutes)


// product routes


app.use(notFound)
app.use(errorMiddleware)

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})


