import React, { useState } from 'react';
import {Accounts} from "meteor/accounts-base";
import classNames from 'classnames';
import toastr from "toastr";

import { validateEmail, validatePassword } from "../../../lib/string";

import "./CreateAccount.scss"

export default () => {
    const [isLoaded, setLoader] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    return(
        <div className="create-account">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-6 offset-xl-3">
                        <h4 className="text-center mt-5">Create account</h4>
                        <form>
                            <div className="form-group">
                                <label>Email address</label>
                                <input value={email}
                                       onFocus={() => { setEmailError(false) }}
                                       onChange={(e) => {setEmail(e.target.value)}}
                                       type="email"
                                       className={classNames({
                                           'form-control': true,
                                           'is-invalid': emailError,
                                       })}
                                />
                                {
                                    emailError ?
                                        <div className="invalid-feedback">
                                            Has to be a real email address.
                                        </div>
                                        :
                                        <small className="form-text text-muted">Provide your email address.</small>
                                }
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input value={password}
                                       onFocus={() => { setPasswordError(false) }}
                                       onChange={(e) => {setPassword(e.target.value)}}
                                       type="password"
                                       className={classNames({
                                           'form-control': true,
                                           'is-invalid': passwordError,
                                       })}
                                />
                                {
                                    passwordError ?
                                        <div className="invalid-feedback">
                                            Minimum eight characters, at least one letter and one number.
                                        </div>
                                        :
                                        <small className="form-text text-muted">
                                            Minimum eight characters, at least one letter and one number.
                                        </small>
                                }

                            </div>
                            <button className="btn btn-success"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if(!validateEmail(email)){
                                            setEmailError(true);
                                            return;
                                        }
                                        if(!validatePassword(password)){
                                            setPasswordError(true);
                                            return;
                                        }
                                        setLoader(true);
                                        Accounts.createUser({
                                            email,
                                            username: email,
                                            password,
                                        }, (err, res) => {
                                            setLoader(false);
                                            if(err){
                                                toastr["error"](err.reason || err.message, "Error!");
                                            }
                                        });
                                    }}
                            >
                                {
                                    isLoaded ?
                                        <span className="spinner-border spinner-border-sm mr-2"></span>
                                        :
                                        null
                                }
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
