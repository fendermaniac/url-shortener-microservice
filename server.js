import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;
app.set('view engine', 'pug');

let shortenedURLs = []

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req,res)=>{
    res.render('index', {url: shortenedURLs})
});

app.post('/shorten', (req,res)=> {
    let url = req.body.url;
    shortenedURLs.push({url});
    res.json(shortenedURLs);
})

app.listen(PORT, () => {
    console.log(`URL Shortener is running on port ${PORT}...`);
});