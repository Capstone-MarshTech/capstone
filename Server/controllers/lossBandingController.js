import mongoose from 'mongoose';

export const totalIncurredBy = async (req, res) => {
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
};

export const distinctClaimNumbersBy = async (req, res) => {
    const loss_band  = req.query.loss_banding;
    try{
        const db = mongoose.connection.db;
        const distinct_loss_banding_values = await db.collection('claim').distinct('claim_number', {loss_banding: loss_band});
        const count = distinct_loss_banding_values.length;
        res.json(count)
    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message}) 
    }   
};

export const largestClaimBy = async (req, res) => {
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
};

export const averageTotalIncurredBy = async (req, res) => {
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
};
export const averageTotalIncurredByPolicyYear = async (req, res) => {
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
};  
export const largestClaimByPolicyYear = async (req, res) => {
    const loss_band = req.query.loss_banding;
    const year = parseInt(req.params.year)
    try{
        const db = mongoose.connection.db
        const largest_claim_by_loss_banding_keyValue = await db.collection('claim').aggregate([
            {
                $match: {loss_banding : loss_band, cleansed_policyyear: year} 
            },
            {
                $group: {
                    _id : null,
                    largest_claim: {$max: "$total_net_incurred" } 
                }
            },
            {
                $project:
                {
                    _id: 0,
                    largest_claim: 1
                }
            }
        ]).toArray();
        const largest_claim_by_loss_banding_value = largest_claim_by_loss_banding_keyValue[0].largest_claim;
        res.json(largest_claim_by_loss_banding_value)
    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message }) 
    }
};
export const distinctClaimNumbersByPolicyYear = async (req, res) => {
    const loss_band  = req.query.loss_banding;
    const year = parseInt(req.params.year);

    try{
        const db = mongoose.connection.db;
        const distinct_loss_banding_values = await db.collection('claim').distinct('claim_number', { loss_banding: loss_band, cleansed_policyyear: year });
        const count = distinct_loss_banding_values.length;
        res.json(count)
    }catch(error){
        res.status(error.statusCode || 500).json({ message: error.message}) 
    }   
};
export const totalIncurredByPolicyYear = async (req, res) => {
    const loss_band  = req.query.loss_banding; 
    const year = parseInt(req.params.year);
     
    try { 
        const db = mongoose.connection.db;
        const total_incurred_keyValue = await db.collection('claim').aggregate([
            {
                $match: { loss_banding: loss_band, cleansed_policyyear : year }
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
};

