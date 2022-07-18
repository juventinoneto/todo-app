const StatusEnum = require('./status');

class Task {
    constructor(id, description, date, status) {
        this.id = id;
        this.date = new Date(date);
        this.description = description;
        this.status = StatusEnum[status.toLowerCase()];
    }
}

module.exports = Task;
