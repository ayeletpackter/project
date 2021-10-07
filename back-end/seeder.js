import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/users.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
    try {
        await Order.deleteMany()//., מוחק את כל ההזמנות מחזיר פרומיס לכן יש המילה await
        await Product.deleteMany()
        await User.deleteMany()

        const createUsers = await User.insertMany(users)//מחזיר את המערך של היוזרים שבמקום הראשון נמצא האדמין

        const adminUser = createUsers[0]._id// מחזיר את היוזר אדמין

        const sampleProducts = products.map((pro) => {// מוסיף לכל מוצר עוד תכונה בשם יוזר שבתוכה יש את האדמין. זה בשביל שאם יש כמה אדמינים אז נוכל לדעת איזה אדמין הוסיף איזה מוצר
            return { ...pro, user: adminUser }
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported'.green.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}




const destroyData = async () => {
    try {
        await Order.deleteMany()//., מוחק את כל ההזמנות מחזיר פרומיס לכן יש המילה await
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data destroyed!'.red.inverse)
        process.exit()

    } catch (error) {
        console.error(`${error}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2]==='-d'){//אם נריץ node backend/seeder -d זה ימחק את כל הנתונים
    destroyData()
}else{
    importData()
}
