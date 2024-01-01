import mongoose from "mongoose";
export async function connect() {
    try{
        mongoose.connect(process.env.MONGO_URI!)// ! means that we are sure that this variable is not null and will always resolve
        const connection = mongoose.connection;// this will give us the connection string that listens on a variety of events
        
        connection.on('connected',()=>{// this will listen to the connected event
            console.log('MongoDB connected successfully');
        })

        connection.on('error',(err)=>{  // this will listen to the error event
            console.log('MongoDB connection error. Please make sure MongoDB is running.'+err);
            process.exit();     // this will exit the process if there is an error
        })


    } catch(error){
        console.log('Something goes wrong');
        console.log(error);
    }


}