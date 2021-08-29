
const taskModel = require('../models/tasks');
const mongoose = require('mongoose');
const getTasks = async (req, res) => {
    try {
        let userId = req.userId;
        if(!userId){
            res.status(400).send({error: "User id missing"});    
        }else{
           

            let tasks = await taskModel.find({ $or:[ {createdBy:userId}, {assignedTo: userId}]});
            res.status(200).send(tasks);    
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const addTask = async (req, res) => {
    try {
        let userId = req.userId;
        let { taskData } = req.body;
       
        if(!userId || Object.keys(taskData).length === 0){
            res.status(400).send({error: "Data fields missing"});    
        }else{
            taskData.createdBy = userId;
            let doc = new taskModel(taskData);
            let task = await doc.save();
            res.status(200).send(task);   
        }
    } catch (e) {
        res.status(500).send(e);
    }
};


const updateTask = async (req, res) => {
    try {
        let { id, status } = req.body;
        if(!id || !status){
            res.status(400).send({error: "Data fields missing"});    
        }else{
            let task = await taskModel.findOneAndUpdate({_id: id}, { status }, {new : true }).exec();
            res.status(200).send(task); 
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

const deleteTask = async (req, res) => {
    try {
        let { id } = req.body;
        if(!id){
            res.status(400).send({error: "Data fields missing"});    
        }else{
            let task = await taskModel.findOneAndDelete({_id: id}).exec();
            res.status(200).send(task); 
        }          
    } catch (e) {
        res.status(500).send(e);
    }
};


module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}