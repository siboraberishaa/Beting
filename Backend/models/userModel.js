import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    citizenship: {
        type: String,
    },
    country: {
        type: String,
    },
    postCode: {
        type: Number,
    },
    city: {
        type: String,
    },
    street: {
        type: String,
    },
    description: {
        type: String,
        default: ''
    },
    dateOfBirth: {
        type: Date,
    },
    phoneNumber: {
        type: Number,
    },
    rolesId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Roles',
    },
    credits: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: false
    },
    registeredBy: {
        type: String,
    },
    commissionS: {
        type: Number,
        default: 0
    },
    commission2: {
        type: Number,
        default: 0
    },
    commission3: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true,
})

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  })
  

const User = mongoose.model("User", userSchema)

export default User