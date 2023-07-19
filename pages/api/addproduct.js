import connectToMongo from '../../Middleware/mongoose'
import Products from '../../models/product'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        console.log(req.body)
        for (let i = 0; i < req.body.length; i++) {
            let p = new Products({
                title: req.body[i].title,
                slug: req.body[i].slug,
                desc: req.body[i].desc,
                img: req.body[i].img,
                color: req.body[i].color,
                size: req.body[i].size,
                catogory: req.body[i].catogory,
                price: req.body[i].price,
                availablquantity: req.body[i].availablquantity,
            })
            await p.save()
        }
        res.status(200).json({sucess:"success"})
    }
    else {
        res.status(400).json({ error: 'bad request' })
    }
}
export default connectToMongo(handler)