const { default: mongoose } = require("mongoose");

class VideoModel {
    constructor() {
        this.Video = mongoose.model('Video', new mongoose.Schema({
            owner_id: String,
            video_id: String,
            locale: String,
            title: String,
            description: String,
            created_date: Date,
            views: Number,
            likes: Number,
            tags: [String],
            link: String
        }));
    }

    getModel() {
        return this.Video;
    }
}

module.exports = new VideoModel();