import connectToMongo from '../../Middleware/mongoose'
import User from '../../models/User'
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method === 'POST') {
        var ciphertext = CryptoJS.AES.encrypt(req.body.password, 'secret123').toString();
        let p = new User({ name: req.body.name, email: req.body.email, password: ciphertext })
        await p.save()
        res.status(200).json({ success: true })
    }
    else {
        res.status(400).json({success: false, error: 'bad request' })
    }
}

export default connectToMongo(handler)