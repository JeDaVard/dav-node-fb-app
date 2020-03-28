import React from "react";
import StripeCheckout from "react-stripe-checkout";
import * as actions from "../actions";
import { connect } from 'react-redux'

class Payments extends React.Component{
    render() {
        return (
            <StripeCheckout
                name="Buy credits"
                description='$10 for 10 credits'
                amount={1000}
                token={token => this.props.handleToken(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button
                    className={'btn light-green z-depth-0'}
                    style={{marginRight: '10px'}}
                >
                    Add credits
                </button>
            </StripeCheckout>
        )
    }
}

export default connect(null, actions)(Payments)