import {Router as expressRouter} from 'express'
import authenticate from '../middlewares/authenticate.js'
import firebaseAdmin from '../auth/firebaseConfig.js'
const router = expressRouter()
import {getUsers,
    updateUserProfile,
    getOneUser,
    deleteOneUser,
	getUserByEmail,
	viewOneUserServices,
	addOneService,
signUp} from '../controllers/userControllers.js'

	function login(){
		console.log("LOGIN FUNCTION")
	}
	//Will eventually use populate() to get pets info in one click
router
	.route('/')
	.get(getUsers) //get all users getUsers

router
	.route('/login')
	.post(login)

router.post('/signUp', signUp)

router
	.route('/:id')
	.get(getOneUser) // select one user getOneUser
	.patch(updateUserProfile)
	.delete(deleteOneUser) //delete one user deleteOneUser
router.get("/:email", getUserByEmail)

// router
// 	.route('/:id/pets/:petId')
// 	.patch(addOnePetToUser) //add pet information to user addOnePet

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