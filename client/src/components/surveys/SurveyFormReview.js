import React from "react";

const SurveyFormReview = props => {
    return (
        <div>
            <h1>survey review</h1>
            <button onClick={props.onCancel}>Back</button>
        </div>
    )
};

export default SurveyFormReview;