// SurveyNew shows SurveyForm and SurveyFormReview
import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

function SurveyNew() {
    const [state, setState] = useState({ showFormReview: false });

    function renderContent() {
        if (state.showFormReview) {
            return (
                <SurveyFormReview
                    onCancel={() => setState({ showFormReview: false })}
                />
            );
        }

        return (
            <SurveyForm
                onSurveySubmit={() => setState({ showFormReview: true })}
            />
        );
    }

    return (
        <div>
            {renderContent()}
        </div>
    );
}

export default reduxForm({
    form: 'surveyForm'
})(SurveyNew);
