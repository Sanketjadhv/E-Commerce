import mongoose from "mongoose";
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("DB CONECTED")
    }
    catch(error){
        console.log("DB ERROR")

    }
}
export default connectDb