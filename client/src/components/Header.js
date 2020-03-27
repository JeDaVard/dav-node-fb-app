import React from 'react';
import { connect } from 'react-redux';
import {Link} from "react-router-dom";
import Payments from './Payments'

class Header extends React.Component {
    renderLogin() {
        switch (this.props.auth) {
            case '':
                return <a href="/auth/google">Login with Google</a>;
            case false:
                return <a href="/auth/google">Login with Google</a>;
            case null:
                return <a href="/">Logging in...</a>;
            default:
               return (
                   <>
                       <li style={{marginRight: '10px'}}>
                           Credits:&nbsp;
                           <button
                               className={'btn-floating light-green pulse z-depth-0'}
                           >
                               {this.props.auth.credits}
                           </button>
                       </li>
                       <li><Payments /></li>
                       <li><a href="/api/logout">Logout</a></li>
                   </>
               )

        }
    }
    render() {
        console.log(this.props.auth);
        return (
            <nav className={'blue-grey darken-4 z-depth-0'}>
                <div className="nav-wraper">
                    <Link to={this.props.auth ? '/surveys' : '/'}
                          className="left brand-logo"
                    >
                        &nbsp; DAVfb
                    </Link>
                    <ul className="right">
                            {this.renderLogin()}
                    </ul>
                </div>
            </nav>
        );
    }
}

const mapStateToProps = ({ auth, credits }) => ({
    auth,
    credits,
});

export default connect(mapStateToProps)(Header);
