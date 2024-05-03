import Reviews from '../models/reviewsModel.js'
async function getReviews (req, res, next){
    res.send("IM IN REVIEWS GET")
}
async function createReview (req, res, next){}
async function findOneReview (req, res, next){}
async function deleteOneReview (req, res, next){}

export {getReviews, createReview, findOneReview, deleteOneReview}