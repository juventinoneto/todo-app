class Task {
    constructor(description, date, status) {
        this.date = new Date(date);
        this.description = description;
        this.status = status;
    }
}

module.exports = Task;
