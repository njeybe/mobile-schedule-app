import express from 'express';
import bcrypt, { genSalt } from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res)=> {
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        });

        const user = await newUser.save();
        res.status(200).json(user);
    }catch(err) {
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        console.log("Login Attempt:", req.body); // 1. See what data arrives

        // Check if env variables are loaded
        if (!process.env.JWT_SECRET) {
            console.log("ERROR: JWT_SECRET is missing!");
            return res.status(500).json("Server Config Error: Missing Secret");
        }

        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            console.log("User not found in DB");
            return res.status(404).json("User not found");
        }

        console.log("User Found:", user.username); // 2. Confirm user exists

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            console.log("Password Incorrect");
            return res.status(400).json("Wrong password");
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "3d" });
        console.log("Token Generated Success");

        const { password, ...others } = user._doc;
        res.status(200).json({ ...others, token });

    } catch (err) {
        // ⚠️ THIS PRINTS THE CRASH REASON
        console.error("FULL ERROR LOG:", err); 
        res.status(500).json(err.message);
    }
});

export default router;