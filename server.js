import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';
import knex from 'knex';
import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfileGet from './controllers/profile.js';
import {handleImage, handleApiCall} from './controllers/image.js';
// import {handleApiCall} from './controllers/image.js';


const db = knex({
  client: 'pg',
  connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
   //  ssl: {
   //  	rejectUnauthorized: false
  	// }
    // host : '127.0.0.1',
    // user : 'nicovonau',
    // password : '',
    // database : 'face'
  }
});

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res)=> {
	res.json(database.users);
})

app.post('/signin', (req, res) => {handleSignin(req, res, db, bcrypt)})

app.post('/register', (req, res) => {handleRegister(req, res, db, bcrypt)})

app.put('/profile/:id', (req, res) => {handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {handleImage(req, res, db)})

app.post('/imageurl', (req, res) => {handleApiCall(req, res)})


// app.listen(process.env.PORT || 3000, ()=> {
// 	console.log(`app is running on port ${process.env.PORT}`)
// })

app.listen(3000, ()=> {
	console.log(`app is running on port 3000`)
})
