import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {fetchSurveys, removeSurvey } from "../actions";

const Dashboard = ({ surveys, fetchSurveys, removeSurvey }) => {
    useEffect(() => {
        fetchSurveys()
    }, []);
    return (
        <main className='mainDash'>
            <div className="dashboard">
                <h4>Dashboard</h4>
                <Link to={'/surveys/new'}><button className='btn blue-grey z-depth-0'>New Survey</button></Link>
            </div>
                    {surveys.reverse().map( ({ title, yes, no, subject, _id, dateSent }) => {
                        return (
                            <div key={_id} className="survey">
                                <div className="survey__top">
                                    <div className="survey__title">
                                        <h2>{title}</h2>
                                        <p>{new Date(dateSent).toLocaleDateString() +' | '+ new Date(dateSent).toLocaleTimeString()}</p>
                                    </div>
                                    <button onClick={() => removeSurvey(_id)} className="survey__remove">REMOVE</button>
                                </div>
                                <div className="survey__body">
                                    <div className="survey__body-left">
                                        <h2>{subject}</h2>
                                    </div>
                                    <div className="survey__body-right">
                                        <div className="survey__body-right-answers">
                                            <p className="survey__body-right-answer">YES</p>
                                            <p className="survey__body-right-result">{yes}</p>
                                        </div>
                                        <div className="survey__body-right-answers">
                                            <p className="survey__body-right-answer">NO</p>
                                            <p className="survey__body-right-result">{no}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
        </main>
    )
};

const mapStateToProps = ({ surveys }) => {
    return {
        surveys
    }
};

export default connect(mapStateToProps, { fetchSurveys, removeSurvey })(Dashboard)