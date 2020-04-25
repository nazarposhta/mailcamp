import React, { Component } from 'react';
import BoardPresentation from "./BoardPresentation/BoardPresentation";
import PartsList from "./PartsList/PartsList";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Cutters} from "../../../../api/collections/cutters";

export default withTracker((props) => {
    const cutterHandle = Meteor.subscribe('cutter', props.cutterId);
    return {
        cutterHandle: cutterHandle.ready(),
        cutter: Cutters.findOne({owner: Meteor.userId(), _id: props.cutterId}) || {}
    }
})((props) => {
    const { cutterId, cutterHandle, cutter } = props;
    return(
        <div className="OneCutter">
            <div className="row">
                <div className="col-6">
                    <BoardPresentation
                        cutterId={cutterId}
                        cutterHandle={cutterHandle}
                        cutter={cutter}
                    />
                </div>
                <div className="col-6">
                    <PartsList
                        cutterId={cutterId}
                        cutterHandle={cutterHandle}
                        cutter={cutter}
                    />
                </div>
            </div>
        </div>
    )
});
