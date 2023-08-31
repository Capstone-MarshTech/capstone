import Claim from '../models/ClaimModel.js';

export const totalNetPaidByPolicyYear = async (req, res) => {
    const  year  = parseInt(req.params.year)

    try { 
        
        const total_net_paid_keyValue = await Claim.aggregate([
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

        ])
        const total_net_paid_value = total_net_paid_keyValue[0].total_net_paid;
        res.json(total_net_paid_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};

export const largestIncurredByPolicyYear = async (req, res) => {
    const  year  = parseInt(req.params.year)

    try { 
        
        const max_claim_keyValue = await Claim.aggregate([
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
        ]);
        const max_claim_value = max_claim_keyValue[0].max_paid;
        res.json(max_claim_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};

export const totalOutstandingByPolicyYear = async (req, res) => {
const  year  = parseInt(req.params.year)

    try { 
        
        const total_outstanding_keyValue = await Claim.aggregate([
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
        ]);
        const total_outstanding_value = total_outstanding_keyValue[0].total_outstanding;
        res.json(total_outstanding_value);
    }catch (error){
        res.status(error.statusCode || 500).json({ message: error.message });

    }
};
export const totalIncurred = async (req, res) => {
        try { 
            
            const total_incurred_keyValue = await Claim.aggregate([
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
            ]);
            const total_incurred_value = total_incurred_keyValue[0].total_incurred;
            res.json(total_incurred_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
    };



export const totalIncurredByPolicyYear = async (req, res) => {
    const  year  = parseInt(req.params.year)
    
        try { 
            
            const total_incurred_keyValue = await Claim.aggregate([
                {
                    $match: { cleansed_policyyear: year }
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
            ]);
            const total_incurred_value = total_incurred_keyValue[0].total_incurred;
            res.json(total_incurred_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
    };

    export const totalNetPaidByLineOfBusinessByPolicyYear = async (req, res) => {
        const year  = parseInt(req.params.year);
        const line_of_business = req.query.marsh_line_of_business_1;

        try { 
            
            const total_net_paid_keyValue = await Claim.aggregate([
                {
                    $match: { cleansed_policyyear: year, marsh_line_of_business_1: line_of_business }
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
    
            ])
            const total_net_paid_value = total_net_paid_keyValue[0].total_net_paid;
            res.json(total_net_paid_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
    };
    
    export const largestIncurredByLineOfBusinessByPolicyYear = async (req, res) => {
        const  year  = parseInt(req.params.year)
        const line_of_business = req.query.marsh_line_of_business_1;

        try { 
            
            const max_claim_keyValue = await Claim.aggregate([
                {
                    $match: { cleansed_policyyear: year, marsh_line_of_business_1: line_of_business }
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
            ]);
            const max_claim_value = max_claim_keyValue[0].max_paid;
            res.json(max_claim_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
    };
    
    export const totalOutstandingByLineOfBusinessByPolicyYear = async (req, res) => {
    const  year  = parseInt(req.params.year)
    const line_of_business = req.query.marsh_line_of_business_1;
        try { 
            
            const total_outstanding_keyValue = await Claim.aggregate([
                {
                    $match: { cleansed_policyyear: year, marsh_line_of_business_1: line_of_business }
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
            ]);
            const total_outstanding_value = total_outstanding_keyValue[0].total_outstanding;
            res.json(total_outstanding_value);
        }catch (error){
            res.status(error.statusCode || 500).json({ message: error.message });
    
        }
    };
    export const totalIncurredByLineOfBusiness = async (req, res) => {
            const line_of_business = req.query.marsh_line_of_business_1;
            try { 
                
                const total_incurred_keyValue = await Claim.aggregate([
                    {
                        $match: { marsh_line_of_business_1: line_of_business }
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
                ]);
                const total_incurred_value = total_incurred_keyValue[0].total_incurred;
                res.json(total_incurred_value);
            }catch (error){
                res.status(error.statusCode || 500).json({ message: error.message });
        
            }
        };
    
    export const totalIncurredByLineOfBusinessByPolicyYear = async (req, res) => {
        const  year  = parseInt(req.params.year)
        const line_of_business = req.query.marsh_line_of_business_1;
            try { 
                
                const total_incurred_keyValue = await Claim.aggregate([
                    {
                        $match: { cleansed_policyyear: year, marsh_line_of_business_1: line_of_business }
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
                ]);
                const total_incurred_value = total_incurred_keyValue[0].total_incurred;
                res.json(total_incurred_value);
            }catch (error){
                res.status(error.statusCode || 500).json({ message: error.message });
        
            }
        };
        
        
            
    
        