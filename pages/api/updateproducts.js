import connectToMongo from '../../Middleware/mongoose'
import Products from '../../models/product'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
        for (let i = 0; i < req.body.length; i++) {
            let p = await Products.findByIdAndUpdate(req.body[i]._id,req.body[i])
        }
        res.status(200).json({sucess:"success"})
    }
    else {
        res.status(400).json({ error: 'bad request' })
    }
}
export default connectToMongo(handler)