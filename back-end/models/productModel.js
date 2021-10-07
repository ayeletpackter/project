import mongoose from 'mongoose'

const reviewSchema=mongoose.Schema({
  name:{type:String,require:true},
  rating:{type:Number,require:true},//דירוג של מישהו ספציפי
  comment:{type:String,require:true}
},{timestamps:true})


const Schema = mongoose.Schema;
const productSchema = new Schema({
  user: {//הקשר בין המוצר ליוזר
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  name: { type: String },
  category: { type: String },
  images: [String],
  description: { type: String },
  price: { type: Number },
  priceAfterSale: { type: Number },
  new: { type: Boolean },
  artistName: { type: String },
  YearOfCreation: { type: String },
  technique: { type: String },
  framing: { type: String },
  shipping: { type: String },
  dimensions:{
    length: { type: Number },
    height: { type: Number },
    width: { type: Number },
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [reviewSchema],
  rating: {//הממןצע של הכל
    type: Number,
    required: true,
    default: 0,
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0,
  }
})

const Product = mongoose.model('Product', productSchema)

export default Product





