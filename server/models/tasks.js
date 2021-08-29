var mongoose  =  require('mongoose');

const schema = new mongoose.Schema({
    taskTitle: {
        type: String,
    },
    taskBody: {
        type: String,
    },
    status: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
}, {
    timestamps: true
})



let collectionName = 'tasks';
module.exports =  mongoose.model(collectionName, schema, collectionName);








