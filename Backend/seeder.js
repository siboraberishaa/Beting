import mongoose from "mongoose";
import dotenv from 'dotenv';
import connectDB from "./config/db.js";
import colors from 'colors';
import users from "./data/users.js";
import roles from "./data/roles.js";
import User from "./models/userModel.js";
import Roles from "./models/rolesModel.js";
import Ticket from "./models/ticketModel.js";


dotenv.config()

connectDB()

const importData = async () => {
    try {
        await User.deleteMany()
        await Roles.deleteMany()
        await Ticket.deleteMany()

        const createdRoles = await Roles.insertMany(roles)
        console.log(`roles imported ${createdRoles}`.green.inverse)
        
         // Map each product to a new object that includes the _id of the corresponding category
         const usersWithRoles = users.map(user => {
            // Find the category document for this product
            const rolesDoc = createdRoles.find(role => role.name === user.rolesId );

            // Return a new object that includes the category _id
            return { ...user, rolesId: rolesDoc._id };
        });

        const createdUsers = await User.insertMany(usersWithRoles)
        console.log(`users imported ${createdUsers}`.green.inverse)


        console.log('All data imported'.green.inverse)
        process.exit()
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1)
    }
}


const destroyData = async () => {
    try {
        await User.deleteMany()
        await Roles.deleteMany()
        await Ticket.deleteMany()

        console.log('data destroyed'. red.inverse)
        process.exit()
    } catch (error) {
       console.error(`${error}`.red.inverse);
       process.exit(1)       
    }
}

// Command-line argument to destroy data (use with caution)
if (process.argv[2] === '-d') {
    destroyData(); // Delete data in the database and exit the app
} else {
    importData(); // Import data into the database
}

