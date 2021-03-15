import React, {Component} from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import {selectEmployeeList, selectShowModal} from "../../redux/selector/employee-selector.js"
import AddEmployee from './add-employee.jsx';

import {setEmployeeList, revokeEmployeeAccess, showAddModal} from '../../redux/actions/action.js';

import './employee-list.scss';


// const useFetching = setEmployeeList => {
//     useEffect( () => {
//         setEmployeeList();
//     })
//   }

class EmployeeList extends Component {

    
    // sortColumn = async (columnData, filterKey, rowlists) => {
        
    //     if(columnData && columnData.sortable) {
    
    //         // const {filterRows, rows} = this.props;
    //         // const filteredData = await getFilteredList(filterKey, "", rowlists);
    //         // const reOrderResponse = await reOrderedList(rows);
    
    //         // filterRows(filteredData, reOrderResponse);
    
    //         // this.forceUpdate();
    //     }
    
    // // }

    handleClick = (email) => {
        axios({
            method: 'get', url: 'https://localhost:9000/api/index/',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
            },
            query:{email}
        }).then(res => {
            console.log("res::::", res);
        });
    }
    componentDidMount() {
        let {setEmployeeList} = this.props;

        setEmployeeList();
    }
  
    
   
        
        render() {
            const {employees,showModal, showEmployeeModal,revokeEmployee} = this.props;
            console.log('employees1', this.props);
            console.log('showModal', showModal);
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
                                {console.log(employees)}
                                    {employees && employees.length > 0 ? employees.map( employee => 
                                        <tr key={employee.id}>
                                            <td> {employee.firstName} {employee.lastName}</td>
                                            <td> {employee.email}</td>
                                            <td> {employee.phoneNumber}</td>
                                            <td> {employee.hasAccess ? 'Authorized': 'Not authorized'} </td>
                                            <td><button onClick={(e) => this.handleClick(employee.email)}>Markopolo.ai github</button></td>
                                            <td><button className={employee.hasAccess ? 'revoke-button': 'allow-button'} onClick={(e) => revokeEmployee(employee.id)}>{employee.hasAccess ? 'Revoke': 'Allow access'}</button> </td>
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