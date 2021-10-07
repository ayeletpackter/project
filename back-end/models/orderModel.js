import mongoose from 'mongoose'
const userSchema = mongoose.Schema;

const orderSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        orderItems: [
            {
                name: { type: String, require: true },
                qty: { type: Number, require: true },
                images: [String],
                price: { type: Number, require: true },
                product: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'Product' }
            }
        ],
        shippingAddress: {
            address: { type: String },
            city: { type: String },
            postalCode: { type: String },
            country: { type: String }
        },
        paymentMethod: {
            type: String,
            require: true
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },

        },
        taxPrice: {
            type: Number,
            require: true,
            default: 0.0
        },
        shippingPrice: {
            type: Number,
            require: true,
            default: 0.0
        },
        totalPrice: {
            type: Number,
            require: true,
            default: 0.0
        },
        isPaid: {
            type: Boolean,
            require: true,
            default: false
        },
        paidAt: {
            type: Date
        },
        isDelivered: {
            type: Boolean,
            require: true,
            default: false
        },
        deliveredAt: {
            type: Date
        },
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', orderSchema)

export default Order















// const mongoose=require('mongoose')
// const Schema=mongoose.Schema;
// const orderSchema=new Schema({
//     id:Number,
//     date:Date,
//     reference:String,
//     shopperName:{
//         firstName:String,
//         lastName:String
//     },
//     userId:Number,
//     shipmentAddress:{
//         country:String,
//         city:String,
//         street:String,
//         zipcode:String
//     },
//     email:String,
//     numOfItems:Number,
//     totalPrice:Number
// })
// module.exports=mongoose.model('orders',orderSchema);