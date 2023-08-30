
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

import countRoute from './routes/counts.js';
import statisticsRoute from './routes/statistics.js'
import dropdownsRoute from './routes/dropDowns.js'
import metricsRoute from './routes/metrics.js'

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/counts', countRoute);
app.use('/statistics', statisticsRoute);
app.use('/dropdowns', dropdownsRoute);
app.use('/metrics', metricsRoute);

const PORT = process.env.PORT || 1337;

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
    


