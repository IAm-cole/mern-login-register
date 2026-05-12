import express from "express";
import User from "../model/user.js";
import protect from '../middleware/auth.js'
import jwt from "jsonwebtoken"

const router = express.Router();




router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "please input all credentials" })
        }
        const userExist = await User.findOne({ email });

        if (userExist) {
            return res.status(400).json({ message: "User already exist" })
        }

        const user = await User.create({ username, email, password })

        const token = generateToken(user._id)
        return res.status(201).json({
            message: "User created",
            id: user._id,
            email: user.email,
            username: user.username,
            token
        })


    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "input all credentials" })
        }
        const user = await User.findOne({ email })

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: "invalid logins" })
        }
        const token = generateToken(user._id)
        res.status(200).json({
            message: "login successfully",
            id: user._id,
            username: user.username,
            email: user.email,
            token
        })



    } catch (error) {
        res.status(500).json({ message: error.message })

    }

})
router.get("/me", protect, async (req, res) => {
    res.status(200).json(req.user)

});

//Generate Token 
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "3d" })
}



export default router;
