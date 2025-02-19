const express = require('express');
const bcrypt = require('bcryptjs');

const jwt = requre('jsonwebtoken');
const User = require('./models/User');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username, password} = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) return res.status(400).json({ message: 'A user with this name already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User Created' });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.coookie('token', token, { httpOnly: true }).json({ message: 'Logged In' });
})

router.get('/me', async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ nessage: "Unauthorized" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');
        res.json(user);
    } catch {
        res.status(401).json({ message: 'Invalid Token' });
    }
});

module.exports = { authRoutes: router }; 