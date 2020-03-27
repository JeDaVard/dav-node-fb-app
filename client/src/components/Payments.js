import React from "react";
import StripeCheckout from "react-stripe-checkout";

export default class Payments extends React.Component{
    render() {
        return (
            <StripeCheckout
                amount={240}
                token={token => console.log(token)}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className={'btn-floating pulse light-green pulse z-depth-0'} style={{marginRight: '10px'}}>ADD</button>
            </StripeCheckout>
        )
    }
}