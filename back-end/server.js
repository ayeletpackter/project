import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import path from 'path' //זה של ה NODE JS
import morgan from 'morgan'



import {notFound,errorHandler} from './middleware/errorMiddleware.js'

dotenv.config()

connectDB()

const app=express()

if(process.env.NODE_ENV=='development'){
app.use(morgan('dev'))//
}

app.use(express.json())//מאפשר לנו לקבל נתונים בצורת JSON בגוף בקשת הPOST

const PORT=process.env.PORT||5000
app.listen(PORT)

app.get('/',(req,res)=>{
    res.send('Hello')
})

app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders',orderRoutes)
app.use('/api/upload',uploadRoutes)


app.get('/api/config/paypal',(req,res)=>
    res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname=path.resolve()
app.use('/uploads',express.static(path.join(__dirname,'/uploads')))//הופך את הקובץ אפלוד סטטי


app.use(notFound)

app.use(errorHandler)

