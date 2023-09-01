import React from 'react'


function CustomTooltip({ payload, label, active }) {
    // console.log("graph2: ", payload)
    if (active) {
        return (
            <>
                <div className="custom-tooltip" >
                    <p className="label">{`Policy Year: ${label}`}</p>
                    <p className="label">{`Total Incurred: ${payload[1].value}`}</p>
                    <p className="label">{`Largest Claim: ${payload[2].value}`}</p>
                </div>
            </>
        );
    }
    return null;
}

export default CustomTooltip