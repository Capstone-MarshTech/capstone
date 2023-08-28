
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
/// 1st route

app.get('/api/claims', async (req, res) => {
        const client = await connectToMongoDB();
      
        try {
          const db = client.db('Blue[i]'); // Replace 'Blue[i]' with your actual database name
          const collection = db.collection('claim'); // Replace 'claim' with your actual collection name
          const data = await collection.find({}).toArray();
          res.json(data);
        } catch (err) {
          console.error('Error fetching data from MongoDB:', err); // Log the error
          res.status(500).json({ error: 'Internal Server Error' });
        } finally {
          client.close();
        }
      });
    












    //1. http://localhost:1337/closed_claims_count/2018....Tested By ThunderClient
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

    //2. http://localhost:1337/open_claims_count/2017....Tested By ThunderClient
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

    //3. http://localhost:1337/zero_value_claims_count/2017....Tested By ThunderClient
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

    //4. http://localhost:1337/total_outstanding/2017....Tested By ThunderClient
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

    //5. http://localhost:1337/total_net_paid/2017....Tested By ThunderClient
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

    //6. http://localhost:1337/largest_claim/2017....Tested By ThunderClient
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

    //7. http://localhost:1337/total_incurred_by?loss_banding=25,001 to 50,000....Tested By ThunderClient
    app.get('/total_incurred_by', async (req, res) => {
        const loss_band  = req.query.loss_banding;   
        try { 
            const db = mongoose.connection.db
            const total_incurred_keyValue = await db.collection('claim').aggregate([
                {
                    $match: { loss_banding: loss_band }
                },
                {
                    $group: {
                        _id: null,
                        total_incurred: {$sum: "$total_net_incurred" } }
                },
                {
                    $project: {
                        _id: 0,
                        total_incurred: 1
                    }
                }
            ]).toArray();
            const total_incurred_value = total_incurred_keyValue[0].total_incurred;
            res.json(total_incurred_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });

        }
    });

    //8. http://localhost:1337/distinct_claim-numbers_by_loss_banding?loss_banding=25,001 to 50,000....Tested By ThunderClient
    app.get('/distinct_claim-numbers_by_loss_banding', async (req, res) => {
        const loss_band  = req.query.loss_banding;
        try{
            const db = mongoose.connection.db;
            const distinct_loss_banding_values = await db.collection('claim').distinct('claim_number', {loss_banding: loss_band});
            const count = distinct_loss_banding_values.length;
            res.json(count)
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
    });

    //9. http://localhost:1337/distinct_claim-numbers_by_loss_banding?loss_banding=25,001 to 50,000....Tested By ThunderClient
    app.get("/largest_claim_by_loss_banding", async (req, res) => {
        const loss_band = req.query.loss_banding;
        try{
            const db = mongoose.connection.db
            const largest_claim_by_loss_banding_keyValue = await db.collection('claim').aggregate([
                {
                    $match: {loss_banding : loss_band} 
                },
                {
                    $group: {
                        _id : null,
                        largest_claim : {$max: "$total_net_incurred" } 
                    }
                },
                {
                    $project:
                    {
                        _id: 0,
                        largest_claim: 1,
                    }
                }
            ]).toArray();
            const largest_claim_by_loss_banding_value = largest_claim_by_loss_banding_keyValue[0].largest_claim;
            res.json(largest_claim_by_loss_banding_value)
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message }) 
        }
    });

    //10. localhost:1337/average_total_incurred_by?loss_banding=10,001 to 15,000....Tested By ThunderClient
    app.get('/average_total_incurred_by', async (req, res) => {
        const loss_band = req.query.loss_banding;
        try {
            const db = mongoose.connection.db;
            const average_total_incurred_by_loss_banding_keyValue = await db.collection('claim').aggregate([
                {
                    $match: {loss_banding : loss_band} 
                },
                {
                    $group: {
                        _id: null,
                        total_incurred_sum: { $sum: "$total_net_incurred" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        average_total_incurred: { $divide: ["$total_incurred_sum", "$count"] }
                    }
                }
            ]).toArray();
    
            if (average_total_incurred_by_loss_banding_keyValue.length > 0) {
                const average_total_incurred_by_loss_banding_value = average_total_incurred_by_loss_banding_keyValue[0].average_total_incurred;
                res.json(average_total_incurred_by_loss_banding_value);
            } else {
                res.json(0); 
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });
    //  http://localhost:1337/distinct_loss-banding_values....Tested By ThunderClient
     app.get('/distinct_loss-banding_values', async (req, res) => {
        try{
            const db = mongoose.connection.db;
            const distinct_loss_banding_values = await db.collection('claim').distinct('loss_banding');
            res.json(distinct_loss_banding_values)
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
    });

    http://localhost:1337/total_incurred_against_number_of_claims_by_loss_banding....Tested By ThunderClient
      app.get('/total_incurred_against_number_of_claims_by_loss_banding', async (req, res) => {
        try {
            const db = mongoose.connection.db;
            const result = await db.collection('claim').aggregate([
                {
                    $group: {
                        _id: "$loss_banding",
                        total_incurred: { $sum: "$total_net_incurred" },
                        num_claims: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        loss_banding: "$_id",
                        _id: 0,
                        total_incurred: 1,
                        num_claims: 1
                    }
                }
            ]).toArray();
    
            res.json(result);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });
    

    
    // http://localhost:1337/years......Tested by ThunderClient
    app.get('/years', async (req, res) =>{
        try {
            const db = mongoose.connection.db
            const years = await db.collection('claim').distinct('cleansed_policyyear')
            res.json(years)
        }catch(error){
                res.status(error.statusCode || 500).json({ message: error.message}) 
            }
    });

    //10. http://localhost:1337/average_total_incurred_in/2017?loss_banding=25,001 to 50,000.....Tested by ThunderClient
    app.get('/average_total_incurred_in/:year', async (req, res) => {
        const loss_band = req.query.loss_banding;
        const year = parseInt(req.params.year)
        try {
            const db = mongoose.connection.db;
            const average_total_incurred_by_loss_banding_keyValue = await db.collection('claim').aggregate([
                {
                    $match: {loss_banding : loss_band, cleansed_policyyear : year} 
                },
                {
                    $group: {
                        _id: null,
                        total_incurred_sum: { $sum: "$total_net_incurred" },
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        average_total_incurred: { $divide: ["$total_incurred_sum", "$count"] }
                    }
                }
            ]).toArray();
    
            if (average_total_incurred_by_loss_banding_keyValue.length > 0) {
                const average_total_incurred_by_loss_banding_value = average_total_incurred_by_loss_banding_keyValue[0].average_total_incurred;
                res.json(average_total_incurred_by_loss_banding_value);
            } else {
                res.json(0); 
            }
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
    });  
    //9. http://localhost:1337/largest_claim_by_loss_banding/2018?loss_banding=25,001 to 50,000.....Tested by ThunderClient
    app.get("/largest_claim_by_loss_banding/:year", async (req, res) => {
        const loss_band = req.query.loss_banding;
        const year = parseInt(req.params.year)
        try{
            const db = mongoose.connection.db
            const largest_claim_by_loss_banding_keyValue = await db.collection('claim').aggregate([
                {
                    $match: { loss_banding : loss_band, cleansed_policyyear : year } 
                },
                {
                    $group: {
                        _id : null,
                        largest_claim : {$max: "$total_net_incurred" } 
                    }
                },
                {
                    $project:
                    {
                        _id: 0,
                        largest_claim: 1,
                    }
                }
            ]).toArray();
            const largest_claim_by_loss_banding_value = largest_claim_by_loss_banding_keyValue[0].largest_claim;
            res.json(largest_claim_by_loss_banding_value)
        }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message }) 
        }
    });
     app.get('/open_claims/:year', async (req, res) => {
        const  year  = parseInt(req.params.year)

        try { 
            const db = mongoose.connection.db
            const claims = await db.collection('claim').find({ open_claim: 1, cleansed_policyyear: year }).toArray(); 
            res.json(claims);
        } catch (error) {
            res.status(error.statusCode || 500).json({ message: error.message });
        }
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


    