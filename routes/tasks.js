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

// GET tasks/2022
router.get('/:year/:month/:day', (req, res, next) => {
    res.status(200).json(new TaskModel('First task', '2022-07-17', Status.waiting));
});

module.exports = router;
