import express from 'express'
import Schedule from '../models/Schedule.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
    const newSchedule = new Schedule({
        ...req.body, userId: req.user.id
    });

    try{
        const savedSchedule = await newSchedule.save();
        res.status(200).json(savedSchedule);
    }catch(err){
        res.status(500).json(err)
    }
});

router.get('/', verifyToken, async (req, res) => {
    try{
        const schedule = await Schedule.find({userId: req.user.id}).sort({time:  1});
        res.status(200).json(schedule);
    }catch (err){
        res.status(500).json(err);
    }
})

export default router;