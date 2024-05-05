import Reviews from '../models/reviewsModel.js'
import User from '../models/userModel.js';
import {error} from '../middlewares/errorHandling.js'

async function getReviews (req, res, next){
    try {
        if(req.query.rating){
        let allReviews = await Reviews.find({rating: req.query["rating"]}).limit(20)
            res.send(allReviews)
        }else {
            let allReviews = await Reviews.find().limit(20).sort({rating: -1})
            res.send(allReviews);
        }

} catch (er) {
    console.log('ERROR IN getReviews:', e);
    next(error(res.status, "Error fetching reviews information"));
}
}
async function createReview (req, res, next){
    try{
        /*body: 
        {"rating": 5, 
    "comment": "lorem ipsum", 
    "date": "10/10/2023", 
    "recommendToFriend": "true", 
    satisfactionLevel: "Satisfied"} 
    http://localhost:5050/reviews/api?userId=<ONE USER ID>
    */
    
        let user;
        let body = req.body
            const schemaPaths = Object.keys(Reviews.schema.paths)
                for (const key in req.query){
                    if(key == "userId"){
                        user = await User.findOne({_id: req.query[key]})
                        body.user = {id: user._id, name: `${user.firstName} `}
                    }
                    if(schemaPaths.includes(key)){
                        const value = req.query[key]
                        body[key] = value
                    }else {
                        console.log(`Key ${key} is not a valid property of the schema`)
                    }
                }
            const newReview = new Reviews(body)
            let result = await newReview.save();
            res.send(result)
        }catch(e){    
            console.log("ERROR creating review: ", e)			  
            next(error(res.status, "Error creating review"))
    }
}
async function findOneReview (req, res, next){
    try {
		let id = req.params.id
		let oneReviews = await Reviews.findById({_id: id})
		res.send(oneReviews);

} catch (e) {
	console.log('ERROR IN findOneReviews:', e);
	next(error(res.status, "Error fetching Reviews information"));
}
}
async function deleteOneReview (req, res, next){	try {
    let id = req.params.id
    let oneReviews = await Reviews.deleteOne({_id: id});
    res.send(oneReviews);
} catch (e) {
console.log('ERROR IN deleteOneReviews:', e);
next();
}}

export {getReviews, createReview, findOneReview, deleteOneReview}