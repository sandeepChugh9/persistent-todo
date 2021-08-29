const jwt = require('jsonwebtoken');
const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.userId = user._id;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports= {
    auth
};