const express = require('express')
const router = express.Router()

const { getAllProducts , getAllProductsStatic , getSingleProduct } = require("../controllers/products.js")


router.route('/static').get( getAllProductsStatic )
router.route('/').get( getAllProducts )
router.route("/single/:id").get(getSingleProduct)
// router.route("/single/").get(getSingleProduct) - route for our query params



module.exports =  router