import { Schema, Model, model } from "mongoose";
import email_validator from "email-validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
const UserSchema = new Schema({
    username: {
        type: Schema.Types.String,
        required: [true, "Username is required"],
        trim: true,
        maxlength: 100,
        minlength: 3,
        lowercase: true
    },
    email: {
        type: Schema.Types.String,
        required: [true, "Email is required"],
        trim: true,
        maxlength: 100,
        minlength: 3,
        validate: {
            validator: value => email_validator.validate(value),
            message: "Invalid email address"
        },
        unique: true
    },
    password: {
        type: Schema.Types.String,
        required: [true, "Password is required"],
        minlength: 8,
    }
}, {
    timestamps: true,
    methods: {
        createJWT() {
            return jwt.sign({id: this._id, username: this.username, email: this.email}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE_DATE})
        },
        async checkPassword(password) {
            return await bcrypt.compare(password, this.password)
        }
    }
})

//custom middleware
UserSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

/**
 * @type {Model}
 */
const User = model('User', UserSchema);
export default User;