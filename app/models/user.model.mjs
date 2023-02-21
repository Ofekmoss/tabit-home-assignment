import mongoose from "mongoose";
import { tabitConstants } from "../constants/tabit.strings.js";

const {Schema} = mongoose;

const userSchema= 
    new Schema({
        name: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            validate: {
                validator: function(value) {
                  const allowedRoles = [tabitConstants.ADMIN, tabitConstants.MANAGER, tabitConstants.WAITER];
                  return allowedRoles.includes(value);
                },
                message: props => `${props.value} is not an allowed role`
              }
        },
        resturant: {
            type: Schema.Types.ObjectId,
            ref: 'Resturant',
            required: false
        }
    })

const User = mongoose.model('User', userSchema);
export default User;