import React from 'react';
import { Meteor } from 'meteor/meteor'
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import "./Menu.scss";

export default withTracker(() => {
    return {
        userId: Meteor.userId()
    }
})((props) => {
    const { userId } = props;
    return(
        <header className="menu">
            <div className="container">
                <div className="navbar clearfix">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/cutting">Cutting</Link>
                        </li>
                        {
                            !userId ?
                                <li className="nav-item">
                                    <Link className="nav-link" to="/create-account">Create account</Link>
                                </li>
                                :
                                null
                        }

                        <li className="nav-item">
                            {
                                userId ?
                                    <a className="nav-link" onClick={() => {
                                        console.log('logout')
                                        Meteor.logout();
                                    }}>Logout</a>
                                    :
                                    <Link className="nav-link" to="/login">Login</Link>
                            }
                        </li>
                    </ul>
                    <div className="logo-img">
                        <Link to="/">
                            <img src="/logo.png" alt="Real furniture maker"/>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
});
