
const userModel = require('../models/users');
const jwt = require('jsonwebtoken');
const addUser = async (req, res) => {
    const { username , email } = req.body;
    try {
        const result = await userModel.findOneAndUpdate({ email }, {  email },{
            new: true,
            upsert: true
        }).exec();

        const accessToken = jwt.sign({ _id: result._id }, process.env.TOKEN_SECRET);
        let response = {
            username: result.username,
            email: result.email,
            accessToken
        }
        res.status(200).send(response);    
    } catch (e) { 
        console.log(e);
        let error = "Something went wrong. Please try again later";    
        res.status(500).send(error);
    }
};

const getUsers = async (req, res) => {
    try {
        let type = req.query.type || 'all';
        let selection = type === 'all'? {}: {_id: req.userId}
        let users = await userModel.find(selection).exec();
        res.status(200).send(users);    
    } catch (e) {
        let error = "Something went wrong. Please try again later"; 
        res.status(500).send(error);
    }
};


module.exports = {
    addUser,
    getUsers
}