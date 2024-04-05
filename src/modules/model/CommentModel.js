const { default: mongoose } = require("mongoose");

class CommentModel {
    constructor() {
        this.Comment = mongoose.model('Comment', new mongoose.Schema({
            video_id: String,
            username: String,
            comment: String,
            created_date: Date
        }));
    }

    getModel() {
        return this.Comment;
    }
}

module.exports = new CommentModel();