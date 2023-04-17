const jwt = require('jsonwebtoken');
const authService = require('/Users/chaseolsen/angular_scholarly_fs/angular-SCHOLARLY/src/app/services/auth.service');



module.exports = (reg, res, next) => {
    try {
    const token = reg.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.love);
    reg.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next();
    } catch (error) {
       res.status(401).json({ message: "Your session has timed out. Please relogin!"});
        location.reload();
        // see if wokrs
        authService.logout();
      
    }
};