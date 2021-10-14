import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            country: { type: String },
            city: { type: String },
            street: { type: String },
            zipcode: { type: String }
        },
        email: { type: String, required: true, },
        phone: { type: String },
        password: { type: String, required: true, },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        purchasesHistory: { type: Array }
    },
    {
        timestamps: true
    }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)//מחזיר האם מה שקיבל כפרמטר תואם את הסיסמא של היוזר הספציפי הזה

}

userSchema.pre('save', async function (next) {//זה ירוץ אוטומטית לפני שמירה או עידכון של משתמש

    if (!this.isModified('password')) {//אם הסיסמא לא השתנתה אנחנו לא רוצים להצפין מחדש(אם רק שיננו את השם של היוזר אין צורך להצפין שוב את הסיסמא)
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})//לפני שאנחנו שומרים יוזר אנחנו רוצים להצפין את הססימא שלו


const User = mongoose.model('User', userSchema)

export default User
