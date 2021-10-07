const express= require('express')
const app=express();
const userRouter=require('./Routes/users')
const productRouter=require('./Routes/Products')
const orderRouter=require('./Routes/Orders')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/users',userRouter)
app.use('/products',productRouter)
app.use('/orders',orderRouter)



// app.get('/',(req,res)=>{
//     res.send('hello')
// })
// app.post('/',(req,res)=>{
//     console.log(req.body.name)
// })

app.listen(5000)