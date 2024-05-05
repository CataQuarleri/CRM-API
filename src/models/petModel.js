import { Schema, model, Mixed } from 'mongoose';

const petType = ['Dog', 'Cat', 'Bird', 'Chicken', 'Farm Animal', 'Rabbit', 'Serpent/Reptile', 'Frogs/Amphibian', 'Small Rodent', 'Other']
const petSchema = new Schema({
        name: {type:String,required:true,},
        typeOfPet: {type: String, enum: petType, required: true},
        breed: String,
        sex: String,
        yearOfBirth: {type: Number, required: true},
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
          isMedicated: {type: Boolean, required: true},
          medicationInfo: [{type: {
              typeOfMedication: String,
              amount: String,
              time: String,
              details: String}}],
        },
        allergies: {
              hasAllergies: Boolean,
              typeOfAllergy: String,
              careInstructions: String,
              additionalInfo: String,
            },
        weightInPounds: Number,
        size: String,
        lastVetVisit: {type: Date},
        vaccines: [{
              date: Date,
              typeOfVaccine: String,
            }],
        food: {
          frequency: {type: Number, required: true},
          foodAllergies: String,
          restrictions: String,
          notes: String,
          meals: [{type: {
              time: Mixed,
              amount: Mixed,
              typeOfFood: String,
              brand: String,
            },
          validate: {
            validator: function(v){
              return val.length == this.frequency
            },
            message: "There should be one meal for each frequency"
          }}],
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
          needs: {type: Boolean, required: true},
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
        parents: { id: Mixed, name: String, phone: String },
        picture: String,
})
const Pet = model('pets', petSchema);

export default Pet
