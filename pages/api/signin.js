import connectToMongo from '../../Middleware/mongoose'
import User from '../../models/User'
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const handler = async (req, res) => {
    if (req.method === 'POST') {
        let user = await User.findOne({ "email": req.body.email })
        var bytes = CryptoJS.AES.decrypt(user.password, 'secret123');
        const decreptPass = bytes.toString(CryptoJS.enc.Utf8)
        if (user) {
            if (req.body.email == user.email && req.body.password == decreptPass) {
                const token = jwt.sign({ email: user.email, name: user.name }, 'jwtsecret',{expiresIn:'1d'})
                res.status(200).json({ success: true, email: user.email, name: user.name, password: req.body.password, token })
            }
            else {
                console.log(user.email, user.password)
                res.status(400).json({ success: false, err: "invalid credentials" })
            }
        }
        else if(!user){
            res.status(400).json({ success: false, err: "invalid credentials" })
        }
    }
    else {
        res.status(400).json({ success: false, error: 'bad request' })
    }
}

export default connectToMongo(handler)