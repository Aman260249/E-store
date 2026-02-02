const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true 
        
    },
    
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true, // Do log ek hi email se register nahi kar sakte
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minlength: 6,
        select: false // Jab hum user ka data mangwayenge, password by default nahi aayega (Security!)
    },
    role: {
        type: String,
        default: 'user' // Admin dashboard ke liye kaam aayega baad mein
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
    
});

// PASSWORD ENCRYPTION: Save karne se pehle password ko hash karna (Security)
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


module.exports = mongoose.model('User', userSchema);