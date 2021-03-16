import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import {selectEmployeeList, selectShowModal} from "../../redux/selector/employee-selector.js"
import AddEmployee from './add-employee.jsx';

import {setEmployeeList, revokeEmployeeAccess, showAddModal} from '../../redux/actions/action.js';

import './employee-list.scss';

class EmployeeList extends Component {

    handleClick = async (email) => {
        let functionRes = await axios({
            method: 'get', url: 'http://localhost:9000/.netlify/functions/index',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            },
            params:{email}
        }).then(res => {
            console.log("res:::", res);
        });
        console.log("functionRes:::", functionRes);
        
    }
    revokeEmployee= async (email, id) => {
        const {revokeEmployee} = this.props;

        let baseUrl = process?.env?.GITHUB_BASE_URL || 'https://api.github.com';
        //  orgName = process?.env?.GITHUB_ORGANIZATION || "markopolo-ai-test",
           

        await axios({
            method: "GET",
            url: `${baseUrl}/search/users`,
            header: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json',
              },
            params:{q: email}
        }).then(res => {
            console.log("revoke access: ", res);
            if(res && res.data) {

                revokeEmployee(id);
            }
        })

    }
    componentDidMount() {
        let {setEmployeeList} = this.props;

        setEmployeeList();
    }
    render() {
        const {employees,showModal, showEmployeeModal} = this.props;

        return (
            <div className="list-section">
                <div className="list-header col-md-12">
                    <div className="list-text col-md-11">All Employees</div>
                    <div className="list-action col-md-2"><button type="button" onClick={() => showEmployeeModal()} className="add-button" data-toggle="modal" data-target="#addEmployee"><i className="fa fa-plus"> </i>Add employee </button></div>
                </div>
                <div className="list-table-view">
                        <table className="list-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Status</th>
                                <th>Organization Github</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                            <tbody className ="rows">
                                {employees && employees.length > 0 ? employees.map( employee => 
                                    <tr key={employee.id}>
                                        <td> {employee.firstName} {employee.lastName}</td>
                                        <td> {employee.email}</td>
                                        <td> {employee.phoneNumber}</td>
                                        <td> {employee.hasAccess ? 'Authorized': 'Not authorized'} </td>
                                        {/* <td><a href="https://github.com/markopolo-ai-test">Markopolo.ai github</a></td> */}
                                        <td><button onClick={(e) => this.handleClick()}>Markopolo.ai github</button></td>
                                        <td><button className={employee.hasAccess ? 'revoke-button': 'allow-button'} onClick={(e) => this.revokeEmployee(employee.email,employee.id)}>{employee.hasAccess ? 'Revoke': 'Allow access'}</button> </td>
                                    </tr>
                                ) : null}
                            </tbody>
                        
                    </table> 
                </div>
                {showModal ? <AddEmployee /> : null}
            </div>
        )
    }
}

// const mapStateToProps = state => ({
//     employees: getEmployeeList(state.employees)
// });
const mapStateToProps = createStructuredSelector({
    employees : selectEmployeeList,
    showModal: selectShowModal
})

const mapDispatchToProps = dispatch => ({
    setEmployeeList: () => dispatch(setEmployeeList()),
    revokeEmployee: id => dispatch(revokeEmployeeAccess(id)),
    showEmployeeModal: () => dispatch(showAddModal())
  });

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeList);