import asyncHandler from 'express-async-handler'

import Product from '../models/productModel.js'

//@desc      Fetch all products
//@route      GET api/products
//@access      public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 10
    const category = req.query.category
    const page = Number(req.query.pageNumber) || 1
    const keyword = req.query.keyword ? { //מחזיר את מה שיש אחרי הסימן שאלה
        name: {
            $regex: req.query.keyword,//זה עושה שאם נחפש גם חלק מהשם של המוצר יופיע המוצר
            $options: 'i'//לא מבדיל בין אות קטנה לגדולה
        }

    } : {}

    let count
    if (category) {
        count = await Product.countDocuments({ ...keyword, category: category })//סופר את כמות המוצרים (הכל או רק מה שיצא בחיפוש)

    } else {
        count = await Product.countDocuments({ ...keyword })//סופר את כמות המוצרים (הכל או רק מה שיצא בחיפוש)
    }
    const products = (req.query.homePage == 'true') ? (await Product.find({})) : (category ? await Product.find({ ...keyword, category: category }).limit(pageSize).skip(pageSize * (page - 1)) : await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)))// מחזיר את הכל או  לפי חיפוש
    //limit(pageSize) מחזיר רק את המספר מוצרים הראשונים
    //skip(pageSize * (page - 1) קופץ למוצרים הרלוונטיים לפי העמוד
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
})

//@desc      Fetch single products
//@route      GET api/products/:id
//@access      public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (Product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')//זה ילך לפונקציה errorHandler
    }


})


//@desc      Fetch products by category
//@route      GET api/category/products/:category
//@access      public
const getProductByCategory = asyncHandler(async (req, res) => {
    const category = req.params.category

    const product = await Product.find({ category: category })
    if (Product) {
        res.json(product)
    }
    else {
        res.status(404)
        throw new Error('Product not found')//זה ילך לפונקציה errorHandler
    }


})


//@desc     delete a product
//@route      DELETE api/products/:id
//@access      private/admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (Product) {
        await product.remove()
        res.json({ message: 'product removed' })
    }
    else {
        res.status(404)
        throw new Error('Product not found')//זה ילך לפונקציה errorHandler
    }
})

//@desc     create a product
//@route      post api/products
//@access      private/admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: '',
        user: req.user._id,
        category: '',
        images: [],
        description: '',
        price: 0,
        priceAfterSale: 0,
        new: true,
        YearOfCreation: 0,
        technique: '',
        framing: '',
        shipping: '',
        dimensions: '',
        countInStock: 0,
        numReviews: 0
    })
    const createdProduct = await product.save()
    res.status(201).json(createdProduct)

})


//@desc     update a product
//@route      PUT api/products/:id
//@access      private/admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, category, images, description, price, priceAfterSale, YearOfCreation, technique, framing, shipping, dimensions, countInStock, numReviews, new: isNew, artist } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.category = category
        product.images = images
        product.description = description
        product.price = price
        product.priceAfterSale = priceAfterSale
        product.YearOfCreation = YearOfCreation
        product.technique = technique
        product.framing = framing
        product.shipping = shipping
        product.dimensions = dimensions
        product.countInStock = countInStock
        product.new = isNew
        product.artist = artist


        const updatedProduct = await product.save()
        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('product not found')
    }
})




//@desc    create new review
//@route      POST api/products/:id/reviews
//@access      private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)

        product.numReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.numReviews

        await product.save()
        res.status(201)
        res.json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('product not found')
    }
})



export { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getProductByCategory }