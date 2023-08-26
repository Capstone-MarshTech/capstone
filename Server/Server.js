import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

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

    // app.get('/closed_claims/:year', async (req, res) => {
        
    //     const  year  = parseInt(req.params.year)


    //     try { 
    //         const db = mongoose.connection.db
    //         const claims = await db.collection('claim').find({ closed_claim: 1, cleansed_policyyear: year }).toArray(); 
    //         res.json(claims);
    //     } catch (error) {
    //         res.status(error.statusCode || 500).json({ message: error.message });
    //     }
    // });
    app.get('/closed_claims_count/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            const claims_count = await db.collection('claim').countDocuments({ closed_claim: 1, cleansed_policyyear: year }); 
            res.json(claims_count);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });
    app.get('/open_claims_count/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            const claims_count = await db.collection('claim').countDocuments({ open_claim: 1, cleansed_policyyear: year }); 
            res.json(claims_count);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });
    // app.get('/open_claims/:year', async (req, res) => {
        
    //     const  year  = parseInt(req.params.year)

    //     try { 
    //         const db = mongoose.connection.db
    //         const claims = await db.collection('claim').find({ open_claim: 1, cleansed_policyyear: year }).toArray(); 
    //         res.json(claims);
    //     } catch (error) {
    //         res.status(error.statusCode || 500).json({ message: error.message });
    //     }
    // });
    app.get('/zero_value_claims_count/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            const claims = await db.collection('claim').countDocuments({ zero_value_claim: 1, cleansed_policyyear: year }) 
            res.json(claims);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });
    app.get('/total_outstanding/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            const total_outstanding_keyValue = await db.collection('claim').aggregate([
                {
                    $match: { cleansed_policyyear: year }
                },
                {
                    $group: {
                        _id: null,
                        total_outstanding: {$sum: "$total_net_os" } }
                },
                {
                    $project: {
                        _id: 0,
                        total_outstanding: 1
                    }
                }
            ]).toArray();
            const total_outstanding_value = total_outstanding_keyValue[0].total_outstanding;
            res.json(total_outstanding_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });

        }
    });
    app.get('/total_net_paid/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            
            const total_net_paid_keyValue = await db.collection('claim').aggregate([
                {
                    $match: { cleansed_policyyear: year }
                },
                {
                    $group: {
                        _id: null,
                        total_net_paid: {$sum: "$total_net_paid" } }
                },
                {
                    $project: {
                        _id: 0,
                        total_net_paid: 1
                    }
                }
            ]).toArray();
            const total_net_paid_value = total_net_paid_keyValue[0].total_net_paid;
            res.json(total_net_paid_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });

        }
    });
    app.get('/largest_claim/:year', async (req, res) => {
        
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            
            const max_claim_keyValue = await db.collection('claim').aggregate([
                {
                    $match: { cleansed_policyyear: year }
                },
                {
                    $group: {
                        _id: null,
                        max_paid: {$max: "$total_net_incurred" } }
                },
                {
                    $project: {
                        _id: 0,
                        max_paid: 1
                    }
                }
            ]).toArray();
            const max_claim_value = max_claim_keyValue[0].max_paid;
            res.json(max_claim_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });

        }
    });
    