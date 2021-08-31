import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            employees: []
        };
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.viewEmployee = this.viewEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then(res => {
            this.setState({ employees: res.data });
        })
    }

    addEmployee() {
        this.props.history.push('/add-employee/_add');
    }

    editEmployee(id) {
        this.props.history.push(`/add-employee/${id}`)
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.componentDidMount();
        })
    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`)
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Employee List</h2>
                <div>
                    <button className="btn btn-success" onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email Address</th>
                                <th className="text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.mailAddress}</td>
                                            <td className="text-center">
                                                <button onClick={() => this.editEmployee(employee.id)}
                                                    className="btn btn-primary" style={{ marginRight: "15px" }}>Update</button>
                                                <button onClick={() => this.viewEmployee(employee.id)}
                                                    className="btn btn-info" style={{ marginRight: "15px" }}>View</button>
                                                <button onClick={() => this.deleteEmployee(employee.id)}
                                                    className="btn btn-danger">Delete</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}
