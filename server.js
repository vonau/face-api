import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const database = {

	users: [
		{
			id: '123',
			name: 'John',
			email: 'john@poop.com',
			password: 'poop',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'Trish',
			email: 'fart@poop.com',
			password: 'ohmd',
			entries: 0,
			joined: new Date()
		},
	]
}

app.get('/', (req, res)=> {
	res.json(database.users);
})

app.post('/signin', (req, res)=> {
	if(req.body.email === database.users[0].email &&
		req.body.password === database.users[0].password) {
		res.json(database.users[0]);
	} else {
		 res.status(400).json('error logging in');
	}
})

app.post('/register', (req, res)=> {
	const { email, name, password } = req.body;
	database.users.push({
		id: '123',
		name: name,
		email: email,
		entires: 0,
		joined: new Date()
	})
	res.json(database.users[database.users.length-1]);
})

app.put('/profile/:id', (req, res)=> {
	const { id } = req.params;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			return res.json(user);
		}
	})
	if(!found){
			res.status(404).json('no such user')
	}
})

app.put('/image', (req, res)=> {
	const { id } = req.body;
	let found = false;
	database.users.forEach(user => {
		if(user.id === id) {
			found = true;
			user.entries++
			return res.json(user.entries);
		}
	})
	if(!found){
			res.status(404).json('no such user')
	}
})


app.listen(3000, ()=> {
	console.log('app is running on port 3k')
})
