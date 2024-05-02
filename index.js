//Run Server
import express from 'express';
import 'dotenv/config'
import {connectToDb} from './data/conn.js'
const app = express();
const port = 5050;
const baseUrl = 'http://localhost:';

//Dependencies
import { join } from 'path';
import store from 'store2';
import multer from 'multer';

//Utilities and middlewares
import error from './src/middlewares/errorHandling.js';
import { createNewUser } from './src/utilities/createNewUser.js';
import { createNewPet } from './src/utilities/createNewPet.js';

//App settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '/public')));
connectToDb()

//Routes
import usersRoutes from './src/routes/usersRoutes.js';
import petsRoutes from './src/routes/petsRoutes.js';
app.use('/users', usersRoutes);
app.use('/pets', petsRoutes);

//Main app
app.get('/', (req, res) => {
	createNewUser()
  // createNewPet()
	res.render('pages/home.ejs');
});

app.get('/success', (req, res) => {
	res.send("You submitted the info correctly. We'll contact you shortly")
})

//Middlewares
app.use((req, res, next) => {
    next(error(404, "Resource Not Found"));
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
  });

//Run server
app.listen(port, () => {
	console.log(`Server listening in: ${baseUrl}${port}`);
});
