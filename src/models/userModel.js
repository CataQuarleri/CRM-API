import { Schema, model, Mixed } from 'mongoose';
let phonePattern = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
let emailPattern = /^[^@]+@[^@]+.[^@]+$/;

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