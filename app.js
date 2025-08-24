import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import pool from './server_scripts/db.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

async function initDB(){
    await pool.query("CREATE table IF NOT EXISTS competitors(" +
        "id serial," +
        "name varchar," +
        "surname varchar," +
        "age integer," +
        "weight integer," +
        "belt integer," +
        "stripe integer," +
        "location varchar)")
}

initDB();

app.post('/addCompetitors', async (req, res) => {
    let wrong = [];
    req.body.competitors.forEach(async (competitor, index) => {
        if(competitor[0] != "" && competitor[1] != "" && competitor[2] != "" && competitor[3] != "" && req.body.location != null){
            await pool.query("INSERT INTO competitors (name, surname, age, weight, belt, stripe, location) values ($1, $2, $3, $4, $5, $6, $7)",
                [competitor[0], competitor[1], competitor[2], competitor[3], competitor[4], competitor[5], req.body.location])
        }else{
            wrong.push(index)
        }
    });
    if(wrong.length > 0){
        res.send({
            error: true,
            wrong: wrong
        })
    }
    res.send({
        error: false,
        wrong: null
    })
})

app.listen(3000, () => {
    console.log('server running on localhost:3000')
});