
const Product = require("../models/product.js")

const getAllProductsStatic = async(req,res)=>{

    // const products = await Product.find({featured:true})
    // const products = await Product.find({
        // name: {$regex:search , $options:'i'} //i stands for case sensitive 
    // })
    // const products = await Product.find({}).sort('name price')
    const products = await Product.find({price:{$gt:30}}).select('name price').limit(5)

    res.status(200).json(products)
}

const getAllProducts = async(req,res)=>{

    //  query
    const { featured , company , name , sort ,fields , numericFilters }= req.query 
    // console.log(typeof featured); //if we log the typeof featured it will return string

    const queryObject = {}

    if(featured){
        queryObject.featured = featured === "true" ? true : false //make sure true is in string 
    }
    if(company){
        queryObject.company = company    
    }
    if(name){
        queryObject.name = {$regex : name , $options : 'i'}  
    }
    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte',
        }
        const regEx = /\b(<|>|>=|<=|=)\b/
        let filters = numericFilters.replace(regEx,(match)=>{
            return `-${operatorMap[match]}-`
        })

        const options = ['price','rating']
        filters = filters.split(',').forEach((item)=>{
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        })
    }

    // sort
    let result = Product.find(queryObject)
    if(sort){
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }else{
        result = result.sort('createAt')
    }

    if(fields){
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }else{
        result = result.select()
    }

    // pagination
    const page = Number(req.query.page) || 1  // becoz the query is coming in strings
    const limit = Number(req.query.limit) || 10  
    const skip = (page-1) * limit
    result = result.skip(skip).limit(limit)

    // Numeric Filters 
    
    const products = await result
    res.status(200).json({products, nbHits:products.length })

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