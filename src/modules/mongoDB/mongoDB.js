const { default: mongoose } = require("mongoose");

class MongoDB {
    constructor() {
        this.isConnected = false;
    }

    async init() {
        try {
            // mongoose
            //     .connect(process.env.MONGODB_URI)
            //     .then(() => console.log('Connected to MongoDB'))
            //     .catch((err) => console.error('Error connecting to MongoDB:', err));
            await mongoose.connect(process.env.MONGODB_URI);
            this.isConnected = true;
            console.log('MongoDB connected successfully');
        } catch (error) {
            console.error('MongoDB connection error:', error);
        }
    }

    isConnected() {
        return this.isConnected;
    }
}

module.exports = new MongoDB();