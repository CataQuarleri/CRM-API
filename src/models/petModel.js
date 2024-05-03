import { Schema, model } from 'mongoose';

const petType = ['Dog', 'Cat', 'Bird', 'Chicken', 'Farm Animal', 'Rabbit', 'Serpent/Reptile', 'Frogs/Amphibian', 'Small Rodent', 'Other']
const petSchema = new Schema({
        name: {type:String,required:true,},
        typeOfPet: {type: String, enum: petType},
        breed: String,
        sex: String,
        age: String,
        microchipped: Boolean,
      
        behavior: 
        {
              specialNeeds: String,
              routine: String,
              trainingRoutine: String,
              fears: String,
              notes: String,
            },
        health: {
          isMedicated: Boolean,
          medicationInfo: [{
              typeOfMedication: String,
              amount: String,
              time: String,
              details: String}],
        },
        allergies: {
              hasAllergies: Boolean,
              typeOfAllergy: String,
              careInstructions: String,
              additionalInfo: String,
            },
        weightInPounds: Number,
        size: String,
         needsFood: Boolean,
         needsWalks: Boolean,
         needsMedication: Boolean,
        needs: String,
        lastVetVisit: Date,
        vaccines: [{
              date: Date,
              typeOfVaccine: String,
            }],
        food: {
          frequency: Number,
          foodAllergies: String,
          restrictions: String,
          notes: String,
          meals: [{
              meal: Number,
              amount: Number,
              typeOfFood: String,
              brand: String,
            }],
        },
        treats: [
          {
          daily: Boolean,
          typeOfTreat: {
            brand: String,
            style: String,
            amount: Number,
          }
        }],
        walks: {
          needs: Boolean,
          amountDaily: Number,
          distanceInMiles: Number,
          timeInMinutes: Number,
          route: String,
          preferences: String,
          habits: String,
          details: String,
        },
        toys: [String],
        relevantInformation: String,
        parents: { id: Number, name: String, phone: String },
        picture: String,
})
const Pet = model('pets', petSchema);

export default Pet
