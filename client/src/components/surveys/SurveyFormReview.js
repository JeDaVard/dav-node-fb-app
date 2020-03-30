import React, {useState} from "react";
import { connect } from 'react-redux';
import {sendSurvey} from "../../actions";
import { withRouter } from "react-router";

const SurveyFormReview = ({onCancel, values, sendSurvey, history}) => {
    const [loading, setLoading] = useState(false);

    return (
        <main className='mainDash'>
            <div className="dashboard">
                <button
                    onClick={onCancel}
                    className='btn blue-grey z-depth-0'
                >
                    Back
                    <i className="material-icons left" style={{marginLeft: '-7px'}}>navigate_before</i>
                </button>
                <h5>Review your survey</h5>
                <button
                    type={'submit'}
                    className='btn light-green darken-2 z-depth-0'
                    onClick={() => {setLoading(true); sendSurvey(values, history)}}
                >
                    {loading ? (
                        <div className="lds-ellipsis">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    ) : (
                        <>
                            Confirm
                            <i className="material-icons right" style={{marginLeft: '7px'}}>done</i>
                        </>
                    )}
                </button>
            </div>
            <div className="surveys">
                <div className="survey-review">
                    <div className="survey-review__field">
                        <p className="survey-review__text survey-review__text--title">
                            {values.title}
                        </p>
                    </div>
                    <div className="survey-review__field">
                        <p className="survey-review__text survey-review__text--subject">
                            {values.subject}
                        </p>
                    </div>
                    <div className="survey-review__field">
                        <p className="survey-review__text survey-review__text--text">
                            {values.body}
                        </p>
                    </div>
                    <div className="survey-review__field">
                        <p className="survey-review__text survey-review__text--rec">
                            {values.recipients}
                        </p>
                    </div>
                </div>
            </div>
        </main>

    )
};

const mapStateToProps = state => {
    return {
        values: state.form.surveyForm.values
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        sendSurvey: (survey, history) => dispatch(sendSurvey(survey, history))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SurveyFormReview));