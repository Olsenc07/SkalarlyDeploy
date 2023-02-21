
module.exports = (reg, res, next) => {
    try {
    const token = reg.headers;
    console.log('token', token);
    next();
    } catch (error) {
       res.status(401).json({ message: "You may not interact with this user because they have blocked you"});
    }
};