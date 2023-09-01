import Claim from '../models/ClaimModel.js'

export const lossBandingValues = async (req, res) => {
    try {
        const distinct_loss_banding_values = await Claim.distinct('loss_banding');

        
        const distinct_loss_banding_values_ordered = distinct_loss_banding_values
            .sort((bandingString1, bandingString2) => {
                
                if (bandingString1 === "zero") {
                    return -1; 
                } else if (bandingString2 === "zero") {
                    return 1; 
                }

                const bandingStringArray1 = bandingString1.split(' ');
                const bandingStringArray2 = bandingString2.split(' ');

                if (bandingStringArray1.length >= 3 && bandingStringArray2.length >= 3) {
                    const value1 = parseFloat(bandingStringArray1[2].replace(/,/g, ''));
                    const value2 = parseFloat(bandingStringArray2[2].replace(/,/g, ''));
                    return value1 - value2;
                } else {
                    return 0;
                }
            });

        res.json(distinct_loss_banding_values_ordered);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


export const years = async (req, res) => {
    try {
        // Retrieve distinct cleansed_policyyear values from the database
        const distinctYears = await Claim.distinct('cleansed_policyyear');

        // Sort the years in ascending order
        const sortedYears = distinctYears.sort((year1, year2) => year1 - year2);

        res.json(sortedYears);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};


export const marshLineOfBusinesses1 = async (req, res) => {
    try {
        
        const marsh_line_of_businesses_1 = await Claim.distinct('marsh_line_of_business_1')
        res.json(marsh_line_of_businesses_1)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
};

export const marshLineOfBusinesses2 = async (req, res) => {
    try {
        
        const marsh_line_of_businesses_2 = await Claim.distinct('marsh_line_of_business_2')
        res.json(marsh_line_of_businesses_2)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
}; 
export const clients = async (req, res) => {
    try {
        
        const client_names = await Claim.distinct('client_name')
        res.json(client_names)
    }catch(error){
            res.status(error.statusCode || 500).json({ message: error.message}) 
        }
};
export const lossBandingValuesbyProductLine = async (req, res) => {
    const line_of_business = req.query.marsh_line_of_business_1;

    try {
        const distinct_loss_banding_values = await Claim.distinct('loss_banding', { marsh_line_of_business_1: line_of_business });

        
        const distinct_loss_banding_values_ordered = distinct_loss_banding_values
            .sort((bandingString1, bandingString2) => {
                
                if (bandingString1 === "zero") {
                    return -1; 
                } else if (bandingString2 === "zero") {
                    return 1; 
                }

                const bandingStringArray1 = bandingString1.split(' ');
                const bandingStringArray2 = bandingString2.split(' ');

                if (bandingStringArray1.length >= 3 && bandingStringArray2.length >= 3) {
                    const value1 = parseFloat(bandingStringArray1[2].replace(/,/g, ''));
                    const value2 = parseFloat(bandingStringArray2[2].replace(/,/g, ''));
                    return value1 - value2;
                } else {
                    return 0;
                }
            });

        res.json(distinct_loss_banding_values_ordered);
    } catch (error) {
        res.status(error.statusCode || 500).json({ message: error.message });
    }
};
