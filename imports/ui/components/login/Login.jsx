import React, { useState } from 'react';
import {
    useHistory
} from "react-router-dom";
import { useInputChange } from '../../../lib/useInputChange';
import toastr from "toastr";
import { validateEmail, validatePassword } from '../../../lib/string';
import classNames from 'classnames';

import "./Login.scss";

export default (props) => {
    const [input, handleInputChange] = useInputChange();
    const [isLoading, setLoading] = useState(false);
    const [dataError, setDataError] = useState({});
    const history = useHistory();
    console.log(dataError)
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
                                        <input name="username"
                                               onChange={handleInputChange}
                                               type="text"
                                               className={classNames({
                                                   'form-control': true,
                                                   'is-invalid': dataError.username,
                                               })}
                                               onFocus={() => {setDataError({...dataError, username: false})}}
                                               value={input.username || ''}
                                        />
                                        {
                                            dataError.username ?
                                                <div className="invalid-feedback visible">
                                                    Has to be a real email address.
                                                </div>
                                                :
                                                <small className="form-text text-muted">
                                                    We'll never share your email with anyone else.
                                                </small>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label>Password</label>
                                        <input  name="password"
                                                onChange={handleInputChange}
                                                type="password"
                                                className={classNames({
                                                    'form-control': true,
                                                    'is-invalid': dataError.password,
                                                })}
                                                onFocus={() => {setDataError({...dataError, password: false})}}
                                                value={input.password || ''}
                                        />
                                        {
                                            dataError.password ?
                                                <div className="invalid-feedback">
                                                    Minimum eight characters, at least one letter and one number.
                                                </div>
                                                :
                                                <small className="form-text text-muted">
                                                    We'll never share your password with anyone else.
                                                </small>
                                        }
                                    </div>
                                    <button className="btn btn-lg btn-success"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                const newStateError = {};
                                                if(!validateEmail(input.username)){
                                                    newStateError.username = true;
                                                }
                                                if(!validatePassword(input.password)){
                                                    newStateError.password = true;
                                                }
                                                if(newStateError.username || newStateError.password){
                                                    setDataError(newStateError);
                                                    return;
                                                }
                                                setLoading(true);
                                                Meteor.loginWithPassword(input.username, input.password, (err, res) => {
                                                    setLoading(false);
                                                    if(err){
                                                        toastr.error(err.reason || err.message, "Error!");
                                                    } else {
                                                        history.push("/");
                                                    }
                                                });

                                            }}
                                    >
                                        {
                                            isLoading ?
                                                <span className="spinner-border spinner-border-sm mr-2"></span>
                                                :
                                                null
                                        }
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
