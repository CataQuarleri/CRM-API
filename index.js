//Run Server
import express from 'express';
import 'dotenv/config'
import url from 'url';
import cors from 'cors'


import {connectToDb} from './data/conn.js'
const app = express();
const port = 5050;
const baseUrl = 'http://localhost:';

//Dependencies
import path, { join } from 'path';

//Utilities and middlewares
import {error} from './src/middlewares/errorHandling.js';
import { seedData } from './src/utilities/seedFunction.js';

//App settings
app.use(
  cors({
    origin: [baseUrl + process.env.PORT],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(join(__dirname, '/public')));
await connectToDb()
await seedData()

//Routes
import usersRoutes from './src/routes/usersRoutes.js';
import petsRoutes from './src/routes/petsRoutes.js';
import reviewsRoutes from './src/routes/reviewsRoutes.js';
app.use('/pets/api', petsRoutes);
app.use('/users/api', usersRoutes);
app.use('/reviews/api', reviewsRoutes);

//Main app
app.get('/', (req, res) => {
res.send("im in home")
});

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
