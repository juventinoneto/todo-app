var express = require('express');
const TaskModel = require('../models/task');
const Status = require('../models/status');

var router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json('List all of the tasks...');
});

// GET tasks/2022
router.get('/:year', (req, res, next) => {
    res.status(200).json('List the tasks of a specific year...');
});

// GET tasks/2022/12
router.get('/:year/:month', (req, res, next) => {
    res.status(200).json('List the tasks of a specific year and month...');
});

// GET tasks/2022/12/12
router.get('/:year/:month/:day', (req, res, next) => {
    res.status(200).json(new TaskModel('First task', '2022-07-17', Status.waiting));
});

// POST
router.post('/', (req, res, next) => {
    res.status(201).json({ 'sucess': true, 'message': 'New task created' });
});

// PATH
router.patch('/:id/change-status', (req, res, next) => {
    res.status(200).json({ 'sucess': true, 'message': 'The status has been changed' });
});

// PUT
router.put('/:id', (req, res, next) => {
    res.status(200).json({ 'sucess': true, 'message': 'Task edited' });
});

// DELETE
router.delete('/:id', (req, res, next) => {
    res.status(200).json({ 'sucess': true, 'message': 'Task excluded' });
});

module.exports = router;
