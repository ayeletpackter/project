import asyncHandler from 'express-async-handler'

import Order from '../models/orderModel.js'

//@desc      create new order
//@route      POST api/orders
//@access      private
const addOrderItems = asyncHandler(async (req, res) => {
    const { oredrItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
   
    if (oredrItems && oredrItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
        return
    }
    else {
        const order = new Order({
            oredrItems, user: req.user._id, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice
        })
        const createdOrder=await order.save()
        //201 זה מצב של משהו חדש נוצר
        res.status(201).json(createdOrder)

    }

})
export {addOrderItems}