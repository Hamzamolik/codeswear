const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    desc: { type: String },
    img: { type: String, required: true },
    color: { type: String, required: true },
    size: { type: String, required: true },
    catogory: { type: String, required: true },
    price: { type: Number, required: true },
    availablquantity: { type: Number, required: true },
}, { timestamps: true })
mongoose.models = {}
export default mongoose.model('Products', productSchema)