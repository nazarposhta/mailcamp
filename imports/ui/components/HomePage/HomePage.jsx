import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import { Link } from 'react-router-dom';
import moment from 'moment';
// react component
import {Cutters} from "../../../api/collections/cutters";

export default withTracker((props) => {
    const cuttersHandle = Meteor.subscribe('cutters');
    return {
        cuttersHandle: cuttersHandle.ready(),
        cutters: Cutters.find({owner: Meteor.userId()}, { sort: { date: -1 } }).fetch(),
    }
})((props) => {
    const { cutters, cuttersHandle } = props;
    return(
        <div className="HomePage">
            <div className="container">
                {
                    cuttersHandle ?
                        <div>
                            {
                                cutters.length ?
                                    cutters.map((cutter) => {
                                        return(
                                            <div key={cutter._id} className="oneCutter card-text">
                                                <Link to={`/cutting/${cutter._id}`}>
                                                    {
                                                        cutter.withoutStructure ?
                                                            'Not structured '
                                                            :
                                                            'Structured '
                                                    }
                                                    {`${cutter.width}mm X ${cutter.height}mm - ${moment(cutter.date).format('MMMM Do YYYY, HH:mm')}`}
                                                    <i className="fas fa-trash m-lg-3"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            Meteor.call('removeCutter', cutter._id, (err, res) => {
                                                                console.log(err, res);
                                                            })
                                                        }}
                                                    ></i>
                                                </Link>
                                            </div>
                                        )
                                    })
                                    :
                                    <div>
                                        No cutters added yet
                                    </div>
                            }
                        </div>
                        :
                        <div>
                            Loading
                        </div>
                }
            </div>
        </div>
    )
});
