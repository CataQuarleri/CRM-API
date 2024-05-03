import {Router as expressRouter} from 'express'
const router = expressRouter()
import {getUsers,
    createUser,
    getOneUser,
    updateOneUser,
    addOnePetToUser,
	getOnePetFromUser,
    deleteOneUser,
    findDates,
	getPaymentsFromDates,
	updatePayment} from '../controllers/userControllers.js'

router
	.route('/')
	.get(getUsers) //get all users getUsers
	.post(createUser) // create new user createUser

router
	.route('/:id')
	.get(getOneUser) // select one user getOneUser
	.patch(updateOneUser) // update existing user profile information updateOneUser
	.delete(deleteOneUser) //delete one user deleteOneUser

router
	.route('/:id/pets/:petId')
	.get(getOnePetFromUser)
	.patch(addOnePetToUser) //add pet information to user addOnePet

router
	.route('/dates') //index dates
	.get(findDates) // get all jobs in certain dates findDates req.query["startingDate"], req.query["endDate"]
	// .patch() //mark certain dates as unavailable?

router
	.route('/payments') //search aggregation
	.get(getPaymentsFromDates) //req.query["dates"]
	.put(updatePayment) //req.query["userId"]

export default router


// router
// 	.route('/quote')
// 	.get((req, res, next) => {
// 		let hasContactInfo = store.get('hasContactInfo');
// 		if (!hasContactInfo?.hasContactInfo) {
// 			res.render('pages/createUser.ejs', {
// 				// async:true,
// 				hasContactInfo: hasContactInfo,
// 				pageName: 'Get a Quote',
// 				phonePattern: phonePattern,
// 				emailPattern: emailPattern
// 			});
// 		} else {
// 			res.redirect('/users/addInfo');
// 		}
// 	})
// 	router.post('/api/contactInfo', (req, res) => {
// 		let body = req.body;
// 		let firstName = req.body.firstName;
// 		let lastName = req.body.lastName;
// 		let phone = req.body.phone;
// 		let email = req.body.email;
// 		let contactPreferences = req.body.contactPreferences;
// 		let _id = (usersArray.length == 0 ? usersArray.length : usersArray.length - 1) + 1;
// 		if (firstName && lastName && phone && email && contactPreferences) {
// 			let data = {
// 				_id: _id,
// 				firstName: firstName,
// 				lastName: lastName,
// 				phone: phone,
// 				email: email,
// 				contactPreferences: contactPreferences
// 			};
// 			store.set('contactInfo', data);
// 			store.set('hasContactInfo', {hasContactInfo: true});
// 			store.set('minUserInfo', {id: _id, name: `${firstName} ${lastName}`, phone: phone})
// 		}
// 		res.json({contactInfo: "saved", _id: _id, status: 201})
// 		// res.redirect('/users/addinfo');
// 	});



// router
// 	.route('/addinfo')
// 	.get((req, res, next) => {
// 		let contactInfo = store.get("hasContactInfo")
// 		console.log("HAS", contactInfo)
// 		res.render('pages/createUser.ejs', {
// 			hasContactInfo: contactInfo.hasContactInfo,
// 			pageName: 'Get a Quote',
// 			phonePattern: phonePattern,
// 			emailPattern: emailPattern
// 		});
// });


// //Api routes
// router
// 	.route('/api')
// 	.get((req, res, next) => {
// 		res.json(usersArray);
// 	})
// 	.post((req, res) => {
// 		let service = req.body.service;
// 		let startingDate = req.body.startingDate;
// 		let endDate = req.body.endDate || "No end date";
// 		let street = req.body.street;
// 		let city = req.body.city;
// 		let state = req.body.state;
// 		let zip = req.body.zip;
// 		let country = req.body.country;
// 		let typeOfAddress = req.body.type;
// 		if(service && startingDate && endDate && street && city && state && zip && country && typeOfAddress) {
// 			let id = (addressesArray.length -1) + 1;
// 			let address = {id: id, typeOfAddress, street, city, state, zip, country}
// 			let addInfo = {service, nextDates: {startingDate, endDate}, address}
// 			console.log("ADD INFO", addInfo)
// 			store.set('addInfo', {addInfo: addInfo})
// 			store.set('address', {address: address})		
// 			res.redirect('/pets');
// 			// res.json({addInfo: addInfo, address: address})
// 		}else {
// 			res.json({error: "Not enough information"})
// 		}
// 	});

// module.exports = router;


// "firstName": "Catalina",
// "lastName": "Quarleri",
// "phone": "3036412156",
// "email": "cataquarleri@gmail.com",
// "contactPreference": "Text Messages",
// "service": "Overnight Care",
// "nextDates": {
// "startingDate": "2024-04-09",
// "endDate": "2024-05-01"
// },
// "address": {
// "id": 0,
// "typeOfAddress": "Parents House",
// "street": "43 Sherman St #301",
// "city": "Denver",
// "state": "CO",
// "zip": "80203",
// "country": "United States"
// },
// "pets": {
// "id": 2,
// "type": "Dog",
// "name": "Osito"
// }