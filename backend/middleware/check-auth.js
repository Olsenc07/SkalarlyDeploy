const jwt = require('jsonwebtoken');



module.exports = (reg, res, next) => {
    try {
    const token = reg.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'And_Even_When_I_Cant_Say_I_Love_You_I_Love_You');
    reg.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
    } catch (error) {
       res.status(401).json({ message: "You are not authenticated!"});
    }
};