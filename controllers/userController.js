const User = require('../models/user');

exports.createUser = async (req, res) => {
    const { name, email, age, password } = req.body;

    if (!name || !email || !age || !password) {
        return res.status(400).json({ code: 300, message: 'Invalid data' });
    }

    if (name.length < 5 || name.length > 10) {
        return res.status(400).json({ code: 301, message: 'Invalid name' });
    }

    if (password.length < 5 || password.length > 10) {
        return res.status(400).json({ code: 302, message: 'Invalid password' });
    }

    if (age < 18) {
        return res.status(400).json({ code: 303, message: 'Invalid age' });
    }

    try {
        const user = new User({ name, email, age, password });
        const savedUser = await user.save();
        return res.status(201).json({ code: 201, message: savedUser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getUsersByAge = async (req, res) => {
    try {
        const users = await User.find({ age: req.params.age });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getUsersAboveAge = async (req, res) => {
    try {
        const users = await User.find({ age: { $gt: req.params.age } });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getUsersByName = async (req, res) => {
    try {
        const users = await User.find({ name: new RegExp(req.params.name, 'i') });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.getUsersOrderedByName = async (req, res) => {
    try {
        const users = await User.find().sort({ name: 1 });
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { name, email, age, password } = req.body;

    if (!name || !email || !age || !password) {
        return res.status(400).json({ code: 300, message: 'Invalid data' });
    }

    if (name.length < 5 || name.length > 10) {
        return res.status(400).json({ code: 301, message: 'Invalid name' });
    }

    if (password.length < 5 || password.length > 10) {
        return res.status(400).json({ code: 302, message: 'Invalid password' });
    }

    if (age < 18) {
        return res.status(400).json({ code: 303, message: 'Invalid age' });
    }

    try {
        const user = await User.findByIdAndUpdate(req.params.id, { name, email, age, password }, { new: true });

        if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }

        return res.status(200).json({ code: 201, message: user });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);

        if (!user) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }

        return res.status(200).json({ code: 200, message: user });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

exports.deleteUsersByEmail = async (req, res) => {
    try {
        const users = await User.deleteMany({ email: req.params.email });

        if (users.deletedCount === 0) {
            return res.status(404).json({ code: 404, message: 'User not found' });
        }

        return res.status(200).json({ code: 200, message: users });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};
