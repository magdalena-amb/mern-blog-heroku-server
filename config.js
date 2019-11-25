module.exports = {
    PORT: process.env.PORT || 8000,
    DB:  process.env.MONGODB_URI || '/mongodb://localhost/mernapp',
};

// process.env.DATABASE_URL || 'mongodb+srv://magdalena_a:test123@cluster0-iamgj.mongodb.net/test?retryWrites=true&w=majority',
