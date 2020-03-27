import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from './actions/actions'
import './App.css'

import Header from "./components/Header";
import Landing from "./components/Landing";
import Dashboard from "./components/Dashboard";
import SurveyNew from "./components/SurveyNew";

class App extends React.Component {
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Header />
                    <div className={'container'}>
                        <Route path="/" component={ Landing } exact />
                        <Route path={'/surveys'} component={ Dashboard } exact />
                        <Route path={'/surveys/new'} component={ SurveyNew } />
                    </div>
                </BrowserRouter>
            </>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchUser: () => dispatch(actions.fetchUser())
    }
};

export default connect(null, mapDispatchToProps)(App);