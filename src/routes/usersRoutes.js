import {Router as expressRouter} from 'express'
const router = expressRouter()
import {getUsers,
    createUser,
    getOneUser,
    updateOneUser,
    addOnePetToUser,
    deleteOneUser,
	getUserByEmail,
	viewOneUserServices,
	addOneService} from '../controllers/userControllers.js'

	//Will eventually use populate() to get pets info in one click
router
	.route('/')
	.get(getUsers) //get all users getUsers
	.post(createUser) // create new user createUser

router
	.route('/:id')
	.get(getOneUser) // select one user getOneUser
	.patch(updateOneUser) // update existing user profile information updateOneUser
	.delete(deleteOneUser) //delete one user deleteOneUser
router.get("/:email", getUserByEmail)
router
	.route('/:id/pets/:petId')
	.patch(addOnePetToUser) //add pet information to user addOnePet

router
	.route('/services/:userId')
	.get(viewOneUserServices)
	.patch(addOneService)

// router
// router
// 	.route('/dates') //index dates
// 	.get(findDates) // get all jobs in certain dates findDates req.query["startingDate"], req.query["endDate"]
// 	// .patch() //mark certain dates as unavailable?

// router
// 	.route('/payments') //search aggregation
// 	.get(getPaymentsFromDates) //req.query["dates"]
// 	.put(updatePayment) //req.query["userId"]

export default router