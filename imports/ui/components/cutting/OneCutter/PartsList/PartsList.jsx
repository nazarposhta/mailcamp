import React, { Component } from 'react';
import {Meteor} from "meteor/meteor";
import {withTracker} from "meteor/react-meteor-data";
import toastr from "toastr";
import Swal from 'sweetalert2/dist/sweetalert2.js'


// react components
import {Parts} from "../../../../../api/collections/parts";

import "./PartsList.scss";
import 'sweetalert2/src/sweetalert2.scss';

export default withTracker((props) => {
    const partsHandle = Meteor.subscribe('parts', props.cutterId);
    return {
        partsHandle: partsHandle.ready(),
        parts: Parts.find({owner: Meteor.userId(), cutterId: props.cutterId}).fetch()
    }
})((props) => {
    const { partsHandle, parts, cutterId, cutterHandle, cutter } = props;
    let widthPopupInfo = 'Width (parallel to the fibers)';
    let heightPopupInfo = 'Height (perpendicular to the fibers )';
    if(cutterHandle){
        if(cutter.withoutStructure){
            widthPopupInfo = 'Width';
            heightPopupInfo = 'Height';
        }
    }
    return(
        <div className="PartsList">
            <h3>List of parts added in to the project</h3>
            {
                partsHandle && cutterHandle ?
                    parts.length ?
                        parts.map((part) => {

                            let calcHeight = 0;
                            const partPresentationWidth = 200;
                            if(part.width && part.height){
                                const coef = part.width / part.height;
                                calcHeight = partPresentationWidth / coef;
                            }

                            return (
                                <div key={part._id} className="one-part-added">
                                    <span className="part-presentation"
                                          style={{height: calcHeight}}
                                    >
                                        <span className="part-presentation-inner">{part.width}mm X {part.height}mm</span>
                                    </span>
                                    <i className="fas fa-trash"
                                       onClick={() => {
                                           Meteor.call('removePart', part._id, (err, res) => {
                                               if(err){
                                                   toastr.error(err.reason || err.message, "Error!");
                                               }
                                           })
                                       }}
                                    ></i>
                                    <i className="fas fa-edit"
                                        onClick={() => {
                                            Swal.fire({
                                                title: 'Edit part',
                                                html:
                                                    `<input id="swal-input1" 
                                                            value="${part.width}" 
                                                            class="swal2-input" 
                                                            onkeypress="${(e) => {
                                                                console.log(Number(e.target.value))
                                                                if(Number(e.target.value) > part.width){
                                                                    return false
                                                                } 
                                                            }}"
                                                            placeholder="${widthPopupInfo}">
                                                     <input id="swal-input2" 
                                                            value="${part.height}" 
                                                            class="swal2-input" 
                                                            onkeydown="${(e) => { if(Number(e.target.value) > part.height){ return false } }}"
                                                            placeholder="${heightPopupInfo}">`,
                                                focusConfirm: false,
                                                preConfirm: () => {
                                                    return [
                                                        document.getElementById('swal-input1').value,
                                                        document.getElementById('swal-input2').value
                                                    ]
                                                },
                                                confirmButtonText: 'Save',
                                                showCancelButton: true,
                                                cancelButtonText: 'Cancel',
                                            }).then((res) => {
                                                const { value } = res;
                                                if(value){
                                                    Meteor.call('updatePart', part._id,
                                                        parseInt(value[0], 10),
                                                        parseInt(value[1], 10),
                                                        (err, res) => {
                                                            console.log(err, res);
                                                    });
                                                }
                                            })
                                        }}
                                    ></i>
                                </div>
                            )
                        })
                        :
                        <div>
                            No parts added yet.
                        </div>
                    :
                    <div>
                        Loading...
                    </div>
            }
            <div className="add-new-part">
                <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            Swal.fire({
                                title: 'Add new part',
                                html:
                                    `<input id="swal-input1" 
                                            class="swal2-input" 
                                            placeholder="${widthPopupInfo}">
                                     <input id="swal-input2" 
                                            class="swal2-input" 
                                            placeholder="${heightPopupInfo}">`,
                                focusConfirm: false,
                                preConfirm: () => {
                                    return [
                                        document.getElementById('swal-input1').value,
                                        document.getElementById('swal-input2').value
                                    ]
                                },
                                confirmButtonText: 'Save',
                                showCancelButton: true,
                                cancelButtonText: 'Cancel',
                            }).then((res) => {
                                const { value } = res;
                                if(value){
                                    Meteor.call('addPart', parseInt(value[0], 10), parseInt(value[1], 10), cutterId, (err, res) => {
                                        console.log(err, res);
                                    });
                                }
                            })


                        }}
                >Add new part</button>
            </div>
        </div>
    )
});
