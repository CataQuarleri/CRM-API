import { Schema, model, Mixed } from 'mongoose';
let phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let emailPattern = /^[^@]+@[^@]+.[^@]+$/;
const petType = ['Dog', 'Cat', 'Bird', 'Chicken', 'Farm Animal', 'Rabbit', 'Serpent/Reptile', 'Frogs/Amphibian', 'Small Rodent', 'Other']

let petSchema = { name: {type:String,required:true,},
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
// parents: { id: Mixed, name: String, phone: String },
picture: String,
}
const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    phone: {type: String,
        validate: {
        validator: function(v) {
          return phonePattern.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }, required: true},
    email: {type: String, required: true,
        validate: {
        validator: function(v) {
          return emailPattern.test(v);
        },
        message: props => `${props.value} is not a valid phone number!`
      }, unique: true, uniqueCaseInsensitive: true},
    otherContacts: [{
        name: String,
        phone: String,
        email: String
    }],
    contactPreference: {
        type: String,
        enum: ['Phone Call', 'Text Message', 'WhatsApp', "Email"]
    },
    services: [{
           status: {type: String, enum: ['Completed', 'Cancelled', 'Pending', 'Current']},
        service: {type: String,
        enum: ["Check In", "Day Care", "Overnight Care", "Long Stay", "Dog Walks"]},
           dates: {start: Date, end: Date},
           paymentAmount: Number,
           paymentMethod: {type: String, enum: ["Cash", "Card", "Venmo", "Zelle", "Check"]}
    }],
    houseInstructions: String,
    address: {
            id: Number,
            coordinates: [Number, Number],
            typeOfAddress: {
                type: String,
                enum: ["Parents House", "DayCare", "Friend or relative", "Work" ]
            },
            street: String,
            city: String,
            state: String,
            zip: String,
            country: String,
          },
    pets: [
        petSchema
    ],
    vetInfo: {
            vet: String,
            address: String,
            website: String,
            phone: String,
          },
    emergencyContact: {
            name: String,
            relation: String,
            phone: String,
          },     
     _baseRate: Number,
    _lastVisit: Date,
    _notes: String,
          
})
userSchema.path('email').index({unique: true,  uniqueCaseInsensitive: true}, "Duplicate Email")
userSchema.index({services: 1})
const User = model('users', userSchema);


export default User
/*
 firstName: {type: String, required: true},
             lastName: {type: String, required: true},
             phone: {type: String, required: true},
             email: {type: String, required: true},
             otherContacts: [{
                 name: String,
                 phone: String,
                 email: String
             }],
             contactPreference: {
                 type: String,
                 enum: ['Phone Call', 'Text Message', 'WhatsApp', "Email"]
             },
             services: [{
                    status: {type: String, enum: ['Completed', 'Cancelled', 'Pending', 'Current']},
                 service: {type: String,
                 enum: ["Check In", "Day Care", "Overnight Care", "Long Stay", "Dog Walks"]},
                    dates: {start: Date, end: Date},
                    paymentAmount: Number,
                    paymentMethod: {type: String, enum: ["Cash", "Card", "Venmo", "Zelle"]}
             }],
             houseInstructions: String,
             address: {
                     id: Number,
                     coordinates: [Number, Number],
                     typeOfAddress: {
                         type: String,
                         enum: ["Parents House", "DayCare", "Friend or relative", "Work" ]
                     },
                     street: String,
                     city: String,
                     state: String,
                     zip: String,
                     country: String,
                   },
             pets: [{
                 id: Mixed,
                 name: String
             }],
             vetInfo: {
                     vet: String,
                     address: String,
                     website: String,
                     phone: String,
                   },
             emergencyContact: {
                     name: String,
                     relation: String,
                     phone: String,
                   },     
              _baseRate: Number,
             _lastVisit: Date,
             _notes: String,
*/