var mongoose  =  require('mongoose');

const schema = new mongoose.Schema({
    username: {
        type: String,
        required : true
    },
    email: {
        type: String,
        unique : true, required : true
    }
}, {
    timestamps: true
})



let collectionName = 'users';
module.exports =  mongoose.model(collectionName, schema, collectionName);