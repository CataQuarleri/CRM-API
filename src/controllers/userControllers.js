import User from '../models/userModel.js';
import Pet from '../models/petModel.js';
import {error} from '../middlewares/errorHandling.js'

//Regex
let phonePattern = '^[0-9]+$'; //I need the phone as a string so I use pattern instead of type number in input
let emailPattern = '^[^@]+@[^@]+.[^@]+$';

async function getUsers(req, res, next) {
	try {
			let select = '_id firstName lastName phone email service pets';
			let allUsers = await User.find().select(select);
			res.send(allUsers);

	} catch (er) {
		console.log('ERROR IN getUsers:', e);
		next(error(res.status, "Error fetching users information"));
	}
}
async function createUser(req, res, next) {
	try{
	let body = req.body
	const schemaPaths = Object.keys(User.schema.paths)
		for (const key in req.query){
			if(schemaPaths.includes(key)){
				const value = req.query[key]
				body[key] = value
			}else {
				console.log(`Key ${key} is not a valid property of the schema`)
			}
		}
	const newUser = new User(body)
	let result = await newUser.save();
	res.send(result)
	}catch(e){
		console.log("ERROR creating user: ", e)
		next(error(res.status, "Error creating user"))
	}
	//required fields:
	// {
	// 	"firstName": "Lisa",
	// 	"lastName": "Simpsons",
	// 	"phone": "1233457647",
	// 	"email": "lisa@gmail.com"
	//   }
}
async function getOneUser(req, res, next) {
	try {
		let id = req.params.id
		let select = '_id firstName lastName phone email service pets';
		let oneUser = await User.findOne({_id: id}).select(select);
		res.send(oneUser);

} catch (e) {
	console.log('ERROR IN getOneUser:', e);
	next(error(res.status, "Error fetching user information"));
}
}
async function updateOneUser(req, res, next) {
	//example request: PATCH http://localhost:5050/users/api/<ONE ID HERE>?firstName=Homer&lastName=Simpson&inexistingPath=asasgasf
	try {
		let id = req.params.id
		let body = {}
		const schemaPaths = Object.keys(User.schema.paths)
		console.log("SCHEMA", schemaPaths)
		for (const key in req.query){
			if(schemaPaths.includes(key)){
				const value = req.query[key]
				body[key] = value
			}else {
				console.log(`Key ${key} is not a valid property of the schema`)
			}
		}
		console.log("BODY", body)
		let updatedUser = await User.updateOne({_id: id}, body)
		res.send(updatedUser);
} catch (e) {
	console.log('ERROR IN updateOneUser:', e);
	next(error(res.status, "Error updating user"));
}
}
async function deleteOneUser(req, res, next) {
	try {
		let id = req.params.id
		let oneUser = await User.deleteOne({_id: id});
		res.send(oneUser);
} catch (e) {
	console.log('ERROR IN deleteOneUser:', e);
	next();
}
}

async function addOnePetToUser(req, res, next) {
	//example request: PATCH http://localhost:5050/users/api/<ONE USER ID HERE>/pets/<ONE PET ID HERE>
	try{
	const onePet = await Pet.findOne({_id: req.params.petId}).select('_id name')
	console.log("PET", onePet)
	if(onePet){
		const updateUser = await User.updateOne({_id: req.params.id}, {'$push': {pets: onePet}})
		res.send(updateUser)
	}else{
		next()
	}
}catch(e){
	console.log("Error in addOnePetToUser", e)
	next(error(res.status, "Error adding pet to user"))
}
}

async function addOneService(req, res, next) {}
async function viewOneUserServices(req, res, next) {}

export {
	getUsers,
	createUser,
	getOneUser,
	updateOneUser,
	deleteOneUser,
	addOnePetToUser,
	addOneService,
	viewOneUserServices
};
