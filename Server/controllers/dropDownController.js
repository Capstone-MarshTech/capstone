import mongoose from 'mongoose';

export const lossBandingValues = async (req, res) => {
    try{
        const db = mongoose.connection.db;
        const distinct_loss_banding_values = await db.collection('claim').distinct('loss_banding');
        res.json(distinct_loss_banding_values)
    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message}) 
    }
};

export const years = async (req, res) => {
    try {
        const db = mongoose.connection.db
        const years = await db.collection('claim').distinct('cleansed_policyyear')
        res.json(years)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
};

export const marshLineOfBusinesses1 = async (req, res) => {
    try {
        const db = mongoose.connection.db
        const marsh_line_of_businesses_1 = await db.collection('claim').distinct('marsh_line_of_business_1')
        res.json(marsh_line_of_businesses_1)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
};

export const marshLineOfBusinesses2 = async (req, res) => {
    try {
        const db = mongoose.connection.db
        const marsh_line_of_businesses_2 = await db.collection('claim').distinct('marsh_line_of_business_2')
        res.json(marsh_line_of_businesses_2)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
}; 