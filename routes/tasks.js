global.db = require('../db');
var express = require('express');
const TaskModel = require('../models/task');
const Status = require('../models/status');

var router = express.Router();

router.get('/', (req, res, next) => {
    global.db.getAll((err, docs) => {
        if (err) res.status(500).json(err);
        else {
            const tasks = docs.map(d => new TaskModel(d._id, d.description,  d.date, d.status));
            res.status(200).json(tasks);
        }
    });  
});

// GET tasks/2022
router.get('/:year', (req, res, next) => {
    const year = req.params.year;
    const date = new Date(year, '00', '01');
    global.db.getByDate(date, (err, docs) => {
        if (err) res.status(500).json(err);
        else {
            const tasks = docs.map(d => new TaskModel(d._id, d.description,  d.date, d.status));
            res.status(200).json(tasks);
        }
    });
});

// GET tasks/2022/12
router.get('/:year/:month', (req, res, next) => {
    const year = req.params.year;
    const month = req.params.month;
    const date = new Date(year, month - 1, '01');
    global.db.getByDate(date, (err, docs) => {
        if (err) res.status(500).json(err);
        else {
            const tasks = docs.map(d => new TaskModel(d._id, d.description, d.date, d.status));
            res.status(200).json(tasks);
        }
    });
});

// GET tasks/2022/12/12
router.get('/:year/:month/:day', (req, res, next) => {
    const year = req.params.year;
    const month = req.params.month;
    const day = req.params.day;
    const date = new Date(year, month - 1, day);
    global.db.getByDate(date, (err, docs) => {
        if (err) res.status(500).json(err);
        else {
            const tasks = docs.map(d => new TaskModel(d._id, d.description,  d.date, d.status));
            res.status(200).json(tasks);
        }
    });
});

// POST
router.post('/', (req, res, next) => {
    if (!req.body.date || !req.body.description || !req.body.status) {
        res.status(422).json({ 'sucess': false, 'message': 'Error: missing parameters...' })
    }
    else {
        const newTask = new TaskModel(null, req.body.description, req.body.date, req.body.status);
        global.db.addTask(newTask, (err, result) => {
            if (err) res.status(500).json(err);
            else {                
                res.status(201).json({ 'sucess': true, 'message': 'New task added...' });
            }
        });        
    }
});

// PATCH
router.patch('/:id/change-status', (req, res, next) => {
    const id = req.params.id;
    const status = req.body.status;
    if (!status) res.status(422).json({ 'sucess': false, 'message': 'Error: missing parameters...' });
    global.db.updateTask(id, Status[status.toLowerCase()], (err, result) => {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json({ 'sucess': true, 'message': 'The status has been changed...' });
        }
    });
});

// PATCH
router.patch('/:id/description', (req, res, next) => {
    const id = req.params.id;
    const description = req.body.description;
    if (!description) res.status(422).json({ 'sucess': false, 'message': 'Error: missing parameters...' });
    global.db.updateTask(id, description, (err, result) => {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json({ 'sucess': true, 'message': 'The task description has been changed...' });
        }
    });
});

// DELETE
router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    global.db.deleteTask(id, (err, result) => {
        if (err) res.status(500).json(err);
        else {
            res.status(200).json({ 'sucess': true, 'message': 'The task has been removed...' });
        }
    });
});

module.exports = router;
