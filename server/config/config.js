process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.PORT = process.env.PORT || 3000;

let urldb;

if (process.env.NODE_ENV === 'dev') {
    urldb = 'mongodb://localhost:27017/cuestionario';
} else {
    urldb = process.env.MONGO_URI;
}

process.env.URLDB = urldb;