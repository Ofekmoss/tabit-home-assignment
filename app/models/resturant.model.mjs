import mongoose from "mongoose";
const {Schema} = mongoose;

const resturantSchema= 
    new Schema({
        name: {
            type: String,
            required: true,
            unique: true
        },
        chain: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    })

const Resturant = mongoose.model('Resturant', resturantSchema);
export default Resturant;