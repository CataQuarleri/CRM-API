import { Schema, model, Mixed } from 'mongoose';

const userSchema = new Schema({
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
            service: {
                type: String,
                enum: ["Check In", "Day Care", "Overnight Care", "Planning a trip", "Dog Walks"]
            },
            nextDates: {startingDate: {type: [Date, null, undefined]}, endDate: {
                type: [String, Date, null, undefined]
            }},
            houseInstructions: String,
            address: {
                    id: Number,
                    coordinates: [Number, Number],
                    typeOfAddress: {
                        type: String,
                        enum: ["Parents House", "DayCare", "Friend or relative" ]
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
            paymentMethod: {
                type: String,
                enum: ["Cash", "Card", "Venmo", "Zelle"]
            },
             _baseRate: Number,
            _lastVisit: Date,
            _payments: [{
                    amount: Number,
                    days: Number,
                    date: String,
                  }],
            _notes: String,
          
})
const User = model('users', userSchema);

export default User