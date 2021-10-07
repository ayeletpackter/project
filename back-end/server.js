import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
import productRoutes from './routes/productRoutes.js'
import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app=express()

const PORT=process.env.PORT||5000
app.listen(PORT)

app.get('/',(req,res)=>{
    res.send('ccello')
})

app.use('/api/products',productRoutes)

app.use(notFound)

app.use(errorHandler)

