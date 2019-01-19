import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import { addShortcut, getUrls, getUrlWithId } from './controllers/controller';

const app = express();
const PORT = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/urlShortener')

app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render('index')
});

app.post('/api/shorturl/new', addShortcut);
app.get('/api/shorturl/all', getUrls);
app.get('/api/shorturl/:shortcut', getUrlWithId);

app.listen(PORT, () => {
    console.log(`URL Shortener is running on port ${PORT}...`);
});