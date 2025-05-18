import mongoose from "mongoose";

const connectDB = async () => {
  if(mongoose.connections[0].readyState){
    return true;
  }

  try {
    console.log("MONGODB_URL:", process.env.MONGODB_URI);
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Mongodb connected')
    return true;
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;