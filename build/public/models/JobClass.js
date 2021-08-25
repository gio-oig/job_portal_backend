"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
class Job {
    constructor(title, description, expiration_date, creator_id, location_id, category_id) {
        this.title = title;
        this.description = description;
        this.expiration_date = expiration_date;
        this.creator_id = creator_id;
        this.location_id = location_id;
        this.category_id = category_id;
    }
}
exports.Job = Job;
