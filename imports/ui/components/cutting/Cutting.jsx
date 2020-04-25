import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import {
    useHistory
} from "react-router-dom";
import { useParams } from "react-router";
import {useInputChange, useCheckboxChange} from "../../../lib/useInputChange";

// react components
import OneCutter from './OneCutter/OneCutter';

import "./Cutting.scss";

export default (props) => {
    const [input, handleInputChange] = useInputChange();
    const [checkbox, handleCheckboxChange] = useCheckboxChange({ withoutStructure: false });
    const history = useHistory();
    const { cutterId } = useParams();
    return(
        <div className="cutting">
            <div className="container">
                {
                    !cutterId ?
                        <div className="row">
                            <div className="col-6">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    Meteor.call('addCutter', input.width, input.height, checkbox.withoutStructure, (err, res) => {
                                        if(!err){
                                            history.push(`/cutting/${res}`);
                                        } else {
                                            alert(err.reason)
                                        }
                                    })
                                }}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Board width (parallel to the fibers)</label>
                                        <input type="text"
                                               name="width"
                                               className="form-control"
                                               onChange={handleInputChange}
                                               value={input.width || ''}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputPassword1">Board height (perpendicular to the fibers )</label>
                                        <input type="text"
                                               name="height"
                                               className="form-control"
                                               onChange={handleInputChange}
                                               value={input.height || ''}
                                        />
                                    </div>
                                    <div className="form-group form-check">
                                        <input onChange={handleCheckboxChange}
                                               value={checkbox.withoutStructure}
                                               name="withoutStructure"
                                               type="checkbox"
                                               className="form-check-input"
                                               id="boardWithoutStructure"/>
                                            <label className="form-check-label" htmlFor="boardWithoutStructure">
                                                <b>Board without structure</b>
                                                <i>(Don't need to pay attention on fibers and parts can be rotated)</i>
                                            </label>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </form>
                            </div>
                        </div>
                        :
                        <OneCutter
                            cutterId={cutterId}
                        />
                }

            </div>
        </div>
    )
}
