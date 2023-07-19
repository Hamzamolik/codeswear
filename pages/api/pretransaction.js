const https = require('https')
const paytmchecksum = require('paytmchecksum')

export default async function handler(req, res) {

    var paytmParams = {}
    paytmParams.body = {
        "requestType": "Payment",
        "mid": process.env.MID,
        "websiteName": process.env.NEXT_PUBLIC_HOST,
        "orderId": req.body.oid,
        "callbackUrl": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
        "txnAmount": {
            "value" : req.body.subTotal,
            "currency" : "INR"
        },
        "userInfo": {
            "custId": req.body.email
        }
    }
    paytmchecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MKEY).then(async (checksum) => {
        paytmParams.head = {
            "Signature": checksum
        }

        var post_data = JSON.parse(paytmParams)
        const requestasync = async () => {
            return new Promise((resolve, reject) => {
                let options = {
                    hostname: "https://securegw.paytm.in",
                    port: 447,
                    path: `/theia/api/v1/initiateTransaction?mid=${process.env.MID}&orderId=${paytmParams.body.orderId}`,
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Content-Length": post_data.length
                    }

                }
                var response = ""
                var request = https.request(options, (post_res) => {
                    post_res.on('data', (chunk) => {
                        response += chunk
                    })
                    post_res.on('end', () => {
                        console.log("Reponse ", response)
                        resolve(response)
                    })
                })
                post_req.write(post_data)
                post_req.end()
            }
            )
        }
        let myr = await requestasync()
        res.status(200).json(myr)
    })
}
