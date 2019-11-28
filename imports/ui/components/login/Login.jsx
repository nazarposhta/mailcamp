import React, { useState } from 'react';

import "./Login.scss";

export default () => {
    const [count, setCount] = useState(0);
    console.log(count)
    return (
        <div className="login-wrapper">
            <div className="login-wrapper-cell">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                            <div className="login-container">
                                <i className="fa fa-times-circle"></i>
                                <h4 className="text-center">Login</h4>
                                <form>
                                    <div className="form-group">
                                        <label>Email address</label>
                                        <input type="email" className="form-control"/>
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input type="password" className="form-control"/>
                                        <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <button className="btn btn-lg btn-success"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCount(count + 1)
                                            }}
                                    >Login {count}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
