import React, { useState } from "react";

const Purpose = ({ selectedPurpose, onPurposeChange }) => {
    const purposes = ["Lani Scholarship", "Graduation Requirements", "Transfer Request", "Academic Records"];

    return (
        <div className="form-group">
            <label>Select Purpose:</label>
            <select
                className="form-control"
                value={selectedPurpose}
                onChange={(e) => onPurposeChange(e.target.value)}
                required
            >
                <option value="" disabled>Select a purpose</option>
                {purposes.map((purpose, index) => (
                    <option key={index} value={purpose}>
                        {purpose}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Purpose;
