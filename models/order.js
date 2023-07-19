const mongoose = require('mongoose')
const { Schema } = mongoose

const orderSchema = Schema({
    userId: { type: String, required: true },
    product: [{
        productId: { type: String, required: true },
        qty: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending' }
}, { timestamps: true })
// mongoose.models = {}
// export default mongoose.model('Orders', orderSchema)
export default mongoose.models.Orders || mongoose.model('Orders',orderSchema)