// SurveyNew shows SurveyForm and SurveyFormReview
import React, { useState } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';
import { connect } from 'react-redux';
import Loading from "../Loading";

function SurveyNew({ credits }) {
    const [state, setState] = useState({ showFormReview: false });

    function renderSurveyContent() {

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

    function render() {
        if (credits >= 10) {
            return renderSurveyContent()
        } else if (credits < 10) {
            return <div className={'absCenter center'}><h5>Not enough founds</h5><p>Please, buy credits for new surveys</p></div>;
        } else {
            return <div className={'absCenter'}><Loading /></div>
        }
    }

    return (
        <div>
            {render()}
        </div>
    );
}

const mapStateToProps = state => ({
    credits: state.auth ? state.auth.credits : undefined
});

export default connect(mapStateToProps)(reduxForm({ form: 'surveyForm' })(SurveyNew));
