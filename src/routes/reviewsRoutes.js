import {Router as expressRouter} from 'express'
const router = expressRouter()
import {getReviews, createReview, findOneReview, deleteOneReview} from '../controllers/reviewsControllers.js'
//get all reviews
//create new review
//find one review
//delete one review
//sort review by rate
router 
    .route('/')
    .get(getReviews) //also option to sort by rate in query
    .post(createReview)

router
    .route('/:id')
    .get(findOneReview)
    .delete(deleteOneReview)


export default router