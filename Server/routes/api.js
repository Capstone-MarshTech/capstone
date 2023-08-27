import express from "express";
// import OpenClaims from "../model/Claims";/////make import based on file name////

const router = express.Router();


/////route 1

// router.get("/openClaims", async (req, res) => {
//   try {
//     const result = await OpenClaims.find();// schema name should be here after await
//     res.status(200).json(result);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });

////from server.js////////////////////////

// router.get('/api/claims', async (req, res) => {
//   const client = await connectToMongoDB();

//   try {
//     const db = client.db('Blue[i]'); // Replace 'Blue[i]' with your actual database name
//     const collection = db.collection('claim'); // Replace 'claim' with your actual collection name
//     const data = await collection.find({}).toArray();
//     res.json(data);
//   } catch (err) {
//     console.error('Error fetching data from MongoDB:', err); // Log the error
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     client.close();
//   }
// });