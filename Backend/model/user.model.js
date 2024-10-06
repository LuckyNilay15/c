
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format validation
    },
    password: {
        type: String,
        required: true,
        minlength: 6, // Minimum password length
    },
}, { timestamps: true }); // Add createdAt and updatedAt fields

const User = mongoose.model("User", userSchema);
export default User;
