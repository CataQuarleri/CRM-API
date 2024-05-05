import {Router as expressRouter} from 'express'
const router = expressRouter()
import {getPets, createNewPet, findOnePet, updateOnePetProfile, onePetNeeds, updateOnePetNeeds} from '../controllers/petControllers.js'

//Will eventually use populate() to get parents info in one click
router
	.route('/')
	.get(getPets)
	.post(createNewPet)

router
	.route('/:id')
	.get(findOnePet)
	.patch(updateOnePetProfile)

router
	.route('/:id/needs') 
	.get(onePetNeeds)
	.patch(updateOnePetNeeds)// required queries: ?meal=true || ?medication=true
	// .delete(deleteOnePetNeed) // required queries: ?meal=MEAL-ID || ?medication=MEDICATION-ID **NOT WORKING YET**

	
	export default router;
	
	
	// router.route('/').get((req, res, next) => {
	// 	let hasNeedsInfo = true;
	// 	console.log('IM IN GET of pets');
	// 	res.render('pages/createPet.ejs', { pageName: pageName, hasNeedsInfo: hasNeedsInfo });
	// });
	
	// router.route('/api')
	// .get((req, res, next) => {
	//     res.send(petsArray)
	// })
	// .post((req, res) => { //for API testing  see body example below
	//     console.log("IM IN PET POST")
	// 	let name = req.body.name;
	// 	let typeOfPet = req.body.typeOfPet;
	// 	let breed = req.body.breed || "I don't know";
	// 	let sex = req.body.sex;
	// 	let age = req.body.age || "I don't know";
	// 	let size = req.body.size || "I don't know";
	// 	let food = req.body.needsFood ? true : false;
	// 	let walks = req.body.needsWalks ? true : false;
	// 	let medication = req.body.needsMedication ? true : false;
	//     console.log("each info", name, typeOfPet, breed, sex, age, food, walks, medication)
	// 	if (name && typeOfPet && breed && sex && age && size) {
	// 		let id = (length == 0 ? length + 1 : length - 1) + 1;
	// 		let minInfo = { id: id, type: typeOfPet, name: name};
	// 		let petInfo = { id: id,  name: name, type: typeOfPet, breed: breed, sex: sex, age: age, size: size, food: food, walks: walks, medication: medication};
	// 		set('minPetInfo', minInfo);
	// 		set('petInfo', petInfo);
	//         console.log("pet info in routes",get('petInfo'))
	//         createNewPet()
	//         res.json({id: petInfo.id, status: 201}).status(201)
	// 		res.redirect('/success');
	// 	} else {
	// 		res.json({ error: 'Not enough information' });
	// 	}
	// });
//POST EXAMPLE /api:
// {
//     "_id": 1,
//     "name": "Osito",
//     "typeOfPet": "Dog",
//     "breed": "Poodle/Maltese",
//     "sex": "M",
//     "age": "7",
//     "size": "small boy",
//     "needsFood": false,
//     "needsWalks": true,
//     "needsMedication": false,
//     "parents": { "id": 1, "name": "Marge Simpson", "phone": "1234567890" },
//     "picture": ""
//   }