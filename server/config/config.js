process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

process.env.PORT = process.env.PORT || 3000;

let urldb;

if (process.env.NODE_ENV === 'dev') {
    //urldb = 'mongodb://localhost:27017/cuestionario';
    urldb = 'mongodb+srv://edmundolopez:I6spJ1keq04Y3lxy@cluster0.fv69p.mongodb.net/cuestionario';
} else {
    urldb = process.env.MONGO_URI;
}

process.env.URLDB = urldb;

//I6spJ1keq04Y3lxy