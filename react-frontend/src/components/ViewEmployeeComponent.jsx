import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employee: {}
        }
    }
    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then((res) => {
            this.setState({ employee: res.data })
        })
    }
    backToList () {
        this.props.history.push('/employees')
    }

    render() {
        return (
            <div className="card col-md-6 offset-md-3">
                <div className="card">
                    <div className="card-header">
                        <h3 className="text-center">View Employee Details</h3>
                    </div>
                    <div className="card-body">
                        <div>First Name: {this.state.employee.firstName}</div>
                        <div>Last Name: {this.state.employee.lastName}</div>
                        <div>Email: {this.state.employee.mailAddress}</div>
                        <div style={{ textAlign: "center", marginTop: "15px"}}>
                            <button onClick={() => this.backToList()} className="btn btn-primary">Back to list</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
