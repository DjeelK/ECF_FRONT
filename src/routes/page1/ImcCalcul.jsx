import React from 'react';

const calculateIMC = (weight, height) => {
    const bmi = weight / Math.pow(height / 100, 2); 
    return (
        <div>
            bmi.toFixed(2);
        </div>
    )
}

export default calculateIMC