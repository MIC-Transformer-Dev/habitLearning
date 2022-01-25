import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {

    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if(!existingUser) return res.status(404).json({ message: "User doesn't exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Wrong Credentials."});

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id, isAdmin: existingUser.isAdmin }, 'mictransformerdev', { expiresIn: '1h' });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: "Something went Wrong." });
    }
}

export const signup = async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        const existingName = await User.findOne({ name: `${firstname} ${lastname}` });
        if(existingUser || existingName) return res.status(404).json({ message: "User already exist." });
        if(password !== confirmPassword) return res.status(400).json({message: "Password don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` });
        const token = jwt.sign({ email: result.email, id: result._id, isAdmin: result.isAdmin  }, 'mictransformerdev', { expiresIn: '1h' });
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({ message: "Something went Wrong." });
    }
}

export const getUsers = async(req,res) => {
    const { page } = req.query;
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; //gettting the start index of every page
        const total = await User.countDocuments({});

        const users= await User.find({isAdmin: false}).sort({ totalScore: -1 }).limit(LIMIT).skip(startIndex);

        res.status(200).json({ data: users, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT) });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const getUser = async(req,res) => {
    const { name } = req.query;
    try {
        const user = await User.find({ name }).sort({ createdAt: -1 });
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
