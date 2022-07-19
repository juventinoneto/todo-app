const { ObjectId } = require('mongodb');

const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost/todo-app-db')
        .then(conn => global.conn = conn.db('todo-app-db'))
        .catch(err => console.log(err));

function getAll(callback) {
    global.conn.collection('tasks')
                .find()
                .toArray(callback);
}

function getById(id, callback) {
    global.conn.collection('tasks')
                .findOne(new ObjectId(id), callback);
}

function getByDate(date, callback) {
    global.conn.collection('tasks')
                .find({ 'date' : { $gte: new Date(date) } })
                .toArray(callback);
}

function addTask(task, callback) {
    global.conn.collection('tasks')
                .insertOne(task, callback);
}

function updateTask(id, status, callback) {
    global.conn.collection('tasks')
                .updateOne({_id: new ObjectId(id)}, { $set: { status: status } }, callback);
}

module.exports = { 
    getAll,
    getById,
    getByDate,
    addTask,
    updateTask
};