import mongoose from 'mongoose'

const userSchema = mongoose.Schema(
    {
        name: {
            firstName: { type: String },
            lastName: { type: String }
        },
        address: {
            country: { type: String },
            city: { type: String },
            street: { type: String },
            zipcode: { type: String }
        },
        email: { type: String },
        phone: { type: String },
        password: { type: String },
        roll: { type: String },
        purchasesHistory: { type: Array }
    },
    {
        timestamps:true
    }
)

const User = mongoose.model('User', userSchema)

export default User
