const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/index.html'));
})

app.get('/dodawanie', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/pages/addCompetitors.html'));
})

app.post('/addCompetitors', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

app.listen(4000, () => {
    console.log('http://localhost:4000')
});