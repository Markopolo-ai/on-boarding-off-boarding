import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {selectShowModal} from "../../redux/selector/employee-selector.js"
import './add-employee.scss';

const AddEmployee = ({showModal}) => {
    console.log("showModal:   ", showModal);
    return (
        <div className={showModal ? 'modal fade show' : 'modal fade'} id="addEmployee" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"> 
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="">
                    <div className="wrapper wrapper--w790">
                        <div className="card card-5">
                            <div className="card-body">
                                    <div className="form-row m-b-55">
                                        <div className="name">Name</div>
                                        <div className="value">
                                            <div className="row row-space">
                                                <div className="col-md-6">
                                                    <div className="input-group-desc">
                                                        <input className="input--style-5" type="text" name="first_name" />
                                                        <label className="label--desc">first name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="input-group-desc">
                                                        <input className="input--style-5" type="text" name="last_name" />
                                                        <label className="label--desc">last name</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="name">Email</div>
                                        <div className="value">
                                            <div className="input-group">
                                                <input className="input--style-5" type="email" name="email" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row m-b-55">
                                        <div className="name">Phone</div>
                                        <div className="value">
                                            <div className="row row-refine">
                                                <div className="col-md-12">
                                                    <div className="input-group-desc">
                                                        <input className="input--style-5" type="text" name="phone" />
                                                        <label className="label--desc">Phone Number</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-row p-t-20">
                                        <label className="label label--block">Give access to organization github?</label>
                                        <div className="p-t-15">
                                            <label className="radio-container m-r-55">Yes
                                                <input type="radio" onChange={(e) => {return true}} checked="checked" name="exist" />
                                                <span className="checkmark"></span>
                                            </label>
                                            <label className="radio-container">No
                                                <input type="radio" name="exist" />
                                                <span className="checkmark"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div>
                                        <button className="btn btn--radius-2 btn--red" type="submit">Add employee</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
    </div>
    )
}

const mapStateToProps = createStructuredSelector({
    showModal : selectShowModal
})

// const mapDispatchToProps = dispatch => ({
//     setEmployeeList: () => dispatch(setEmployeeList()),
//     revokeEmployee: id => dispatch(revokeEmployeeAccess(id)),
//     showModal: () => dispatch(showAddModal())
//   });

export default connect(mapStateToProps, null)(AddEmployee);
