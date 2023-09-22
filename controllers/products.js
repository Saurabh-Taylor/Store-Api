const Product = require("../models/product.js")

const getAllProductsStatic = async(req,res)=>{

    // const products = await Product.find({featured:true})
    // const products = await Product.find({
    //     name: "vase table"
    // })
    const products = await Product.find({})

    res.status(200).json(products)
}

const getAllProducts = async(req,res)=>{

    //  query
    const { featured , company }= req.query //if we log the typeof featured it will return string
    // console.log(typeof featured); 

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === "true" ? true : false //make sure true is in string 
    }
    if(company){
        queryObject.company = company    
    }

    const product = await Product.find(queryObject)
    res.status(200).json(product)

}

const getSingleProduct = async (req,res)=>{
    // params
    const {id } = req.params
    const data = await Product.findById(id)
    res.status(200).json(data)

}

module.exports ={
    getAllProductsStatic,
    getAllProducts,
    getSingleProduct
}