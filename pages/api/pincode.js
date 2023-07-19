export default function handler(req,res){
    let pins={
        "150124":["Multan","bawasare"],
        "485267":["karachi","lkh"],
        "102010":["lahore","islamabad"]
    }
    res.status(200).json(pins)
}