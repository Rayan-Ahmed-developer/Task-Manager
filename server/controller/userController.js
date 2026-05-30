const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../Service/userService');

const getUsers = async (req, res) => {
    try {

        console.log("BODY:", req.body);

        const UserData = req.body;

        const password = await bcrypt.hash(
            UserData.password,
            10
        );

        UserData.password = password;

        const users = await User.create(UserData);

        res.send(users);

    } catch(error){       
        console.log("SIGNUP ERROR:", error);

        res.status(500).send({
            msg: "Server error",
            error: error.message
        });
    }
}
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await User.findOne({ email });
        if(!user){
            return res.status(400).send({ msg: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).send({ msg: "Invalid credentials" });
        }
        const token = generateToken(user._id);
        res.send({ token });
        
    }catch(error){
        res.status(500).send({msg: "Server error"});
    }
}

module.exports = { getUsers, loginUser };
    