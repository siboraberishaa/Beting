import mongoose from "mongoose";
import { defaultPermissions } from "../constants.js";





const rolesSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permissions: {
        type: Object,
        default: defaultPermissions,
    }

});

const Roles = mongoose.model("Roles", rolesSchema);

export default Roles;
