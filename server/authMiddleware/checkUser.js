const jwt = require("jsonwebtoken");
console.log("CHECKUSER FILE RUNNING");

const checkUser = (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader) {
            return res.status(401).send({ msg: "No token provided" });
        }

        const token = authHeader.replace("Bearer ", "");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).send({ msg: "Invalid token" });
    }
};

module.exports = checkUser;