
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import claimsRoutes from './routes/claims.js';
import lossBandingRoutes from './routes/lossBanding.js'
import dropdownRoutes from './routes/dropDowns.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/claims', claimsRoutes)
app.use('/loss_banding', lossBandingRoutes)
app.use('/dropdown', dropdownRoutes)

const PORT = process.env.PORT || 9000;

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		app.listen(PORT, () =>
			console.log(`MongoDB is running... Server is running on: http://localhost:${PORT}`)
		);
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
    
    
    



