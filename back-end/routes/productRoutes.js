import express from "express"
import asyncHandler from 'express-async-handler'
const router = express.Router()

import Product from '../models/productModel.js'


//@desc      Fetch all products
//@route      GET api/products
//@access      public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})//מחזיר את הכל
    res.json(products)
}))


//@desc      Fetch single products
//@route      GET api/products/:id
//@access      public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (Product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')//זה ילך לפונקציה errorHandler
    }
}))

export default router