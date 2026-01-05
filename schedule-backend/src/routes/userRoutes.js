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
    try{
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword){
            return res.status(404).json({message: 'Incorrect password, please try again.'})
        }

        const token = jwt.sign({ id: user_id}, process.env.JWT_SECRET, {expiresIn: '3d'});

        // removes password from response
        const {password, ...others} = user._doc;
        res.status(200).json({...others, token});
    
    }catch (err){
        res.status(500).json(err)
    }
})

export default router;