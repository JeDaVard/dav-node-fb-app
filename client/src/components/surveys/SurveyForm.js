import React from "react";
import { reduxForm, Field } from "redux-form";
import SurveyField from "./SurveyField";
import validateEmails from "../../utils/validateEmails";

import FIELDS from './formFields';

const SurveyForm = (props) => {
    return (
        <main className='mainDash'>
            <div className="dashboard">
                <h5>New survey</h5>
            </div>
            <div className="surveys">
                <form onSubmit={props.handleSubmit( values => {console.log(values); props.onSurveySubmit()})}>
                    { FIELDS.map(({label, name}) => {
                        return <Field key={name} component={SurveyField} label={label} name={name}/>
                    }) }
                    <button
                        type={'submit'}
                        className='btn blue-grey z-depth-0 nextButton'
                    >
                        Next
                        <i className="material-icons right" style={{marginLeft: '7px'}}>navigate_next</i>
                    </button>
                </form>
            </div>
        </main>
    )
};

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    if (!values.title) errors.title = 'You must provide a title';
    if (!values.subject) errors.subject = 'You must provide the subject';
    if (!values.body) errors.body = 'You can\'t send an empty message';
    if (!values.recipients) errors.recipients = 'You must provide minimum one recipient';

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm)