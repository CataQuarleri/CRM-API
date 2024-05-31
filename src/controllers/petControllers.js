import User from '../models/userModel.js';
import {error} from '../middlewares/errorHandling.js'

async function getPets (req, res, next){
    try {
        let allPets = await User.aggregate([
            {
              '$unwind': {
                'path': '$pets'
              }
            }, {
              '$project': {
                '_id': 0, 
                'petId': '$pets._id', 
                'petName': '$pets.name', 
                'typeOfPet': '$pets.typeOfPet', 
                'breed': '$pets.breed', 
                'sex': '$pets.sex', 
                'yearOfBirth': '$pets.yearOfBirth', 
                'food': '$pets.food', 
                'needsWalks': '$pets.walks.needs', 
                'needsMedication': '$pets.health.isMedicated', 
                'picture': '$pets.picture', 
                'userId': '$_id', 
                'parentName': {
                  '$concat': [
                    '$firstName', ' ', '$lastName'
                  ]
                }
              }
            }
          ])
          res.send(allPets)

} catch (er) {
    console.log('ERROR IN getPets:', er);
    next(error(res.status, "Error fetching pets information"));
}
}

async function findOnePet (req, res, next){
    try {
		let id = req.params.petId
		let onePet = await User.findOne({ "pets._id": id }, {"pets.$": 1})
        if(onePet){
            res.send(onePet.pets[0])
        }else{
            next(error(res.status, "No pet found with this ID"))
        }
} catch (e) {
	console.log('ERROR IN findOnePet:', e);
	next(error(res.status, "Error fetching pet information"));
}
}

async function createNewPet (req, res, next){
    try{
        let newPetData = req.body;
    let userId = req.params.userId
    let petParent = await User.updateOne({_id: userId}, {$push: {pets: newPetData}})
    if(petParent.acknowledged){
        res.status(200).send(`Pet added succesfully, pet id: ${petParent.upsertedId}`)
    }else{
        res.status(500).send(`Could not add Pet to parent`)
    }
    }catch(err){
        next(error(res.status, 'Error creating new pet'))
    }
    /*Required fields
    {"name": "Snowball III", "typeOfPet": "Cat", "yearOfBirth": 2010, "health.isMedicated": "false", "food.frequency": 1, "walks.needs": "false"}
    */
}

async function updateOnePetProfile (req, res, next){
    try {
		let id = req.params.petId
		let user = await User.findOne({ "pets._id": id })
        
        if(user){
            let petToUpdate = user.pets.id(id)
            if(petToUpdate){
                for (const key in req.body){
                    petToUpdate[key] = req.body[key]
                }
            }else{
            next(error(res.status, "No pet found with this ID"))

            }
            
            await user.save()
            res.send(petToUpdate)
        }else{
            next(error(res.status, "User not found"))
        }
} catch (e) {
	console.log('ERROR IN updateOnePetProfile:', e);
	next(error(res.status, "Error updating pet profile"));
}
}

//     try {
// 		let id = req.params.id
// 		let body = {}
// 		const schemaPaths = Object.keys(Pet.schema.paths)
//         console.log("SHCEMA", schemaPaths)
// 		for (const key in req.query){
// 			if(schemaPaths.includes(key)){
// 				const value = req.query[key]
// 				body[key] = value
// 			}else {
// 				console.log(`Key ${key} is not a valid property of the schema`)
// 			}
// 		}
// 		let updatedPet = await Pet.updateOne({_id: id}, body)
// 		res.send(updatedPet);
// } catch (e) {
// 	console.log('ERROR IN updateOnePet:', e);
// 	next(error(res.status, "Error updating pet"));
// }
// }

async function onePetNeeds(req, res, next){
    try {
		let _id = req.params.id
		let onePet = await Pet.findById({_id}, '_id name food health walks')
		res.send(onePet);

} catch (e) {
	console.log('ERROR IN onePetNeeds:', e);
	next(error(res.status, "Error fetching pet needs information"));
}
}
async function updateOnePetNeeds(req, res, next){
    try {
		let id = req.params.id
		if(req.query.addMeal){
            let body = req.body
            /*example:
            {"time": "morning", "amount": "1 cup", "typeOfFood": "Raw", "brand": "Homemade"} */
            const newMeal = await Pet.updateOne({_id: id}, {$addToSet: {"food.meals": body}}).exec()
            console.log("new meal", newMeal)
            res.send(newMeal)
        }else if(req.query.addMedication){
            let body = req.body
            /*example:
            {"typeOfMedication": "Injection", "details": "To lower pain"} */
            const newMedication = await Pet.updateOne({_id: id}, {$push: {"health.medicationInfo": body}}).exec()
            res.send(newMedication)
        }
} catch (e) {
	console.log('ERROR IN findOnePet:', e);
	next(error(res.status, "Error fetching pet information"));
}
}
// async function deleteOnePetNeed(req, res, next){
//     try {
// 		let id = req.params.id
// 		if(req.query["meal"]){
//             let findFirst = await Pet.findOne({_id: id, "food.meals": {$not: {$elemMatch: {id: req.query["meal"]}}}})
//             console.log(findFirst)
//             // const newMeal = await Pet.updateOne({id}, {'$push': {meals: body}})
//             res.send(findFirst)
//         }
        // res.send(id)
        // else if(req.query.medication){
        //     let body = req.body
        //     /*example:
        //     {"typeOfMedication": "Injection", "details": "To lower pain"} */
        //     const newMedication = await Pet.updateOne({id}, {'$push': {medicationInfo: body}})
        //     res.send(newMedication)
        // }
		// res.send(onePet);

// } catch (e) {
// 	console.log('ERROR IN findOnePet:', e);
// 	next(error(res.status, "Error fetching pet information"));
// }
// }

export {getPets, createNewPet, findOnePet, updateOnePetProfile, onePetNeeds, updateOnePetNeeds}