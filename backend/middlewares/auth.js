const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    if(!req.get('Authorization')) {
        return res.status(401).json({ error: 'Access denied' })
    }
    let token = req.get('Authorization').split(' ')[1]
    if(!token) {
        return res.status(401).json({ error: 'Access denied' })
    }
    try {
        let payload = jwt.verify(token, process.env.SECRET)
        req.body.user_id = payload._id
        next() 
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}

module.exports = verifyToken;