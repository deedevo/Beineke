require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const morgan = require("morgan");
const request = require('request');
const authRoutes = require('./router/authRouter');


let path = require("path");

const app = express()
const port = process.env.PORT || 3000;

app.disable('x-powered-by')

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(morgan('dev'))

app.set('views', './views');
app.set('views engine', 'ejs');

app.use("/new", require("./router/lastrel"));
app.use("/home", require('./router/index'));
app.use("/contact", require('./router/contact'));
app.use("/popular", require('./router/popular'));
app.use("/comics", require('./router/comics'))
app.use("/audiobooks",require('./router/audiobook'))
app.use(authRoutes);
const bookRoute = require('./router/bookRouter')
app.use('/book',bookRoute)

app.get('/admin', (req, res) => {
    res.render('find');
});

app.get('/find', (req, res) => {
    res.render('find');
});

app.get('/update', (req, res) => {
    res.render('update');
});

app.get('/delete', (req, res) => {
    res.render('delete');
});


app.use('/img',express.static(path.join(__dirname, 'public/img')));
app.use('/js',express.static(path.join(__dirname, 'public/js')));
app.use('/css',express.static(path.join(__dirname, 'public/css')));

const connect = (url = 'mongodb+srv://dias:zxdstryh@cluster0.gdyhv.mongodb.net/backend?retryWrites=true&w=majority', opts = {}) => {
    return mongoose.connect(
        url,
        { ...opts, useNewUrlParser: true, useUnifiedTopology: true}
    )
}
app.get('/', (req, res) => {
    res.render(path.resolve('public/views/index.ejs'))
});
const start = async () => {
    try {
        await connect()
        app.listen(port, () => {
            console.log(`http://localhost:${port}`)
        })
    } catch (e) {
        console.error(e)
    }
}
start()

app.post('/books', (req, res) => {
    let searchText = req.body.searchText;
    request({
            uri: 'https://api.itbook.store/1.0/search/' + searchText
        },
        function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let data = JSON.parse(body);
                res.render('/Users/diasibragim/Desktop/Beineke/public/views/books.ejs', { data });
            } else {
                res.json(error);
            }
        });
})

