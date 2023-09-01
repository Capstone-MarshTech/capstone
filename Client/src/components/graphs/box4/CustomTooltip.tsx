import React from 'react'

function CustomTooltip({ payload, label, active }) {
    // console.log("graph4: ", payload)
    if (active) {
        return (
            <>
                <div className="custom-tooltip" >
                    <p className="label">{`Loss Band: ${payload[0].payload['Loss Banding']}`}</p>
                    <p className="label">{`Largest Claim: ${payload[0].payload['Largest Claim']}`}</p>
                    <p className="label">{`Average Cost of Claim: ${payload[1].payload['Average Total Incurred']}`}</p>                
                </div>
            </>
        );
    }
    return null;
}

export default CustomTooltip