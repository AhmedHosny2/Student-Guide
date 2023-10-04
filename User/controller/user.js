const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
exports.signupUser = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        password,
        semester,
        github,
        linkedin,
        whatsapp,
    } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new userModel({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            semester,
            github,
            linkedin,
            whatsapp,
        });
        await newUser.save();
        res.status(200).json({ message: "User created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

exports.getLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Email does not exist" });
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ message: "Password is incorrect" });
        }
        req.session.isLoggedIn = true;
        req.session.user = user;
        console.log(req.session);
        res.status(200).json({ message: "Login Successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err});
    }
};
