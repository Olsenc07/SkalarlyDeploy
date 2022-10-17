const jwt = require('jsonwebtoken');



module.exports = (reg, res, next) => {
    try {
    const token = reg.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.love);
    reg.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
    } catch (error) {
       res.status(401).json({ message: "Error! You may not be authenticated! Please check your email!"});
    }
};