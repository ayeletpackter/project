import mongoose from 'mongoose'

const connectDB=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI,{
            // useUnifiedTopology:true,//כל מיניהגדרות שצריך להשים
            // useNewUrlParser:true,
            // useCreateIndex:true
        })
        console.log(`connected:${conn.connection.host}`.cyan.underline)//השתי מילים האחרונות זה רק לעצב את ההדפסות
        
    } catch (error) {
        console.error(`Error:${error.message}`.red.underline.bold)
        process.exit(1)//תיצא מהתוכנית. 1 אומר שזה קרה בגלל שגיאה
    }
}
export default connectDB