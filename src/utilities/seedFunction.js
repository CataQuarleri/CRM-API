import User from '../models/userModel.js';
import Pet from '../models/petModel.js';
import Reviews from '../models/reviewsModel.js';
import userSeed from '../../data/userSeed.json' assert { type: 'json' };;
import petSeed from '../../data/petSeed.json' assert { type: 'json' };;
import reviewSeed from '../../data/reviewSeed.json' assert { type: 'json' };;

async function seedData(){
    try {
        await User.deleteMany({});
        await Pet.deleteMany({});
        await Reviews.deleteMany({});

        await User.insertMany(userSeed)
        await Pet.insertMany(petSeed)
        await Reviews.insertMany(reviewSeed)
        console.log("Seeded database correctly")
    }catch(e){
        console.log("Error seeding data: ", e)
    }
}

export {seedData}
/*
//connect to database
//import model
//fucntion seedData(collection, path){
//path = '../data/petSeed.json'
//petSeed.forEach(pet => {
    //let newPet = new Pet({
        ...pet
// })ah w

// })
// }
*/