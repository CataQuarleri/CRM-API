import User from '../models/userModel.js';
import Pet from '../models/petModel.js';
import {error} from '../middlewares/errorHandling.js'
import firebaseAdmin from '../auth/firebaseConfig.js'


async function getUsers(req, res, next) {
	try {
			let select = '_id firstName lastName phone email service pets';
			let allUsers = await User.find().select(select).limit(10).sort({email: 1});
			res.send(allUsers);

	} catch (er) {
		console.log('ERROR IN getUsers:', e);
		next(error(res.status, "Error fetching users information"));
	}
}

async function signUp(req, res, next) {
	{
		const { email, firstName, password, phone } = req.body;
	  
		if (!email || !firstName || !password || !phone) {
		  return res.status(400).json({
			error:
			  "Invalid request body. Must contain email, password, and firstName for user."
		  });
		}
	  
		try {
		  const newFirebaseUser = await firebaseAdmin.auth.createUser({
			email,
			password
		  });
	  
		  if (newFirebaseUser) {
			const newUser = new User({
				email,
				firstName,
				phone,
				_id: newFirebaseUser.uid
			  })
			  let result = await newUser.save()

			// await User.insertOne({
			//   email,
			//   firstName,
			//   phone,
			//   _id: newFirebaseUser.uid
			// });
		  }
		  return res
			.status(200)
			.json({ success: "Account created successfully. Please sign in." });
		} catch (err) {
			if (err.code === 11000) {
				console.error('Email must be unique');
				next(error(res.status, "User already exists"))
			  }else {
				  console.log("ERROR creating user: ", err)			  
				}
				next(error(res.status, "Error creating user"))
		  if (err.code === "auth/email-already-exists") {
			return res
			  .status(400)
			  .json({ error: "User account already exists at email address." });
		  }
		  return res.status(500).json({ error: "Server error. Please try again", message: err });
		}
	  }
}

async function updateUserProfile(req, res, next) {
	try {
		let userProfile = req.body;
		let id = req.params.id
		let userToUpdate = await User.updateOne({_id: id}, userProfile)
		if(userToUpdate.acknowledged){
			res.status(200).send('User updated succesfully')
		}else {
			res.status(500).send('Could not update user profile')
		}
	} catch (error) {
		next(error(res.status, 'Error updating user profile'))
	}
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

		const updateUser = await User.findOneAndUpdate({_id: req.params.id}, {'$push': {pets: onePet}})
		const updatePet = await Pet.updateOne({_id: req.params.petId}, {'$set': {parents: {id: updateUser._id, name: `${updateUser.firstName} ${updateUser.lastName}`, phone: updateUser.phone}}})
		console.log("updatePet", updatePet)
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
async function getUserByEmail(req, res, next) {}

export {
	getUsers,
	updateUserProfile,
	getOneUser,
	deleteOneUser,
	getUserByEmail,
	addOnePetToUser,
	addOneService,
	viewOneUserServices,
	signUp
};
