import React, { Component } from 'react';
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {Cutters} from "../../../../../api/collections/cutters";

import "./BoardPresentation.scss";

export default (props) => {
    const { cutter, cutterHandle } = props;
    let calcHeight = 0;
    const boardPresentationWidth = 540;
    if(cutterHandle && cutter && cutter.width && cutter.height){
        const coef = cutter.width / cutter.height;
        calcHeight = boardPresentationWidth / coef;
    }
    if(!cutterHandle){
        return (
            <div>
                Loading...
            </div>
        )
    }
    return(
        <div className="board-presentation-wrapp">
            <div className="board-width-info">
                <i className="long-arrow-left"></i>
                <i className="long-arrow-right"></i>
                <div className="width-info-text">{cutter.width} mm</div>
            </div>
            <div className="board-height-info">
                <i className="long-arrow-top"></i>
                <i className="long-arrow-bottom"></i>
                <div className="height-info-text">
                    {cutter.height} mm
                </div>
            </div>
            <div className="board-presentation"
                 data-without-structure={cutter.withoutStructure}
                 style={{
                     height: calcHeight
                 }}
            ></div>
        </div>

    )
};
