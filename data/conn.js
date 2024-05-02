import mongoose from 'mongoose'

async function connectToDb(){
    try {

        let connectionString = process.env.MONGO_URI || ""
        let connect = await mongoose.connect(connectionString)
        console.log("Connected to DB")
    }catch(e){
        console.log("Error connecting to database", e)}
}

export {connectToDb}