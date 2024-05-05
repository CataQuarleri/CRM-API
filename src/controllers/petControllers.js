import Pet from '../models/petModel.js';
import User from '../models/userModel.js';
import {error} from '../middlewares/errorHandling.js'

async function getPets (req, res, next){
    try {
        let select = '_id name typeOfPet breed sex yearOfBirth needsFood needsWalks needsMedication parents';
        let allPets = await Pet.find().select(select).limit(10).sort({typeOfPet: 1});
        res.send(allPets);

} catch (er) {
    console.log('ERROR IN getPets:', e);
    next(error(res.status, "Error fetching pets information"));
}
}
async function createNewPet (req, res, next){
    /*Required fields
    {"name": "Snowball III", "typeOfPet": "Cat", "yearOfBirth": 2010, "health.isMedicated": "false", "food.frequency": 1, "walks.needs": "false"}
    */
   //optional query ?email=akersley0@patch.com
    try{
        let user;
        let body = req.body
            const schemaPaths = Object.keys(Pet.schema.paths)
            if(req.query.parentsEmail){
            
            }
                for (const key in req.query){
                    if(key == "parentsEmail"){
                        user = await User.findOne({email: req.query[key]})
                        body.parents = {id: user._id, name: `${user.firstName} ${user.lastName}`, phone: user.phone}
                    }
                    if(schemaPaths.includes(key)){
                        const value = req.query[key]
                        body[key] = value
                    }else {
                        console.log(`Key ${key} is not a valid property of the schema`)
                    }
                }
            const newPet = new Pet(body)
            let result = await newPet.save();
            res.send(result)
        }catch(e){    
            console.log("ERROR creating pet: ", e)			  
            next(error(res.status, "Error creating pet"))
    }
}
async function findOnePet (req, res, next){
    try {
		let id = req.params.id
		let onePet = await Pet.findById({id})
		res.send(onePet);

} catch (e) {
	console.log('ERROR IN findOnePet:', e);
	next(error(res.status, "Error fetching pet information"));
}
}
async function updateOnePetProfile (req, res, next){
    try {
		let id = req.params.id
		let body = {}
		const schemaPaths = Object.keys(Pet.schema.paths)
        console.log("SHCEMA", schemaPaths)
		for (const key in req.query){
			if(schemaPaths.includes(key)){
				const value = req.query[key]
				body[key] = value
			}else {
				console.log(`Key ${key} is not a valid property of the schema`)
			}
		}
		let updatedPet = await Pet.updateOne({_id: id}, body)
		res.send(updatedPet);
} catch (e) {
	console.log('ERROR IN updateOnePet:', e);
	next(error(res.status, "Error updating pet"));
}
}

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