import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            firstName: '',
            lastName: '',
            mailAddress: ''
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    componentDidMount() {
        if (this.state.id === '_add') {
            return
        } else {
            EmployeeService.getEmployeeById(this.state.id).then((res) => {
                let employee = res.data;
                Object.keys(employee).forEach(key => {
                    if (employee[key] === null) {
                        employee[key] = ''
                    }
                    this.setState({ [key]: employee[key] })
                })
            })
        }
    }
    onInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        let employee = { firstName: this.state.firstName, lastName: this.state.lastName, mailAddress: this.state.mailAddress }

        if (this.state.id === '_add') {
            EmployeeService.createEmployee(employee).then(() => {
                this.props.history.push('/employees');
            })
        } else {
            EmployeeService.updateEmployee(this.state.id, employee).then(() => {
                this.props.history.push('/employees');
            })
        }
    }
    onCancel() {
        this.props.history.push('/employees');
    }
    renderTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Employee</h3>
        } else {
            return <h3 className="text-center">Update Employee</h3>
        }
    }
    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            {this.renderTitle()}
                            <div className="card-body">
                                <form>
                                    <div className="form-group mb-3">
                                        <label>First Name: </label>
                                        <input type="text" name="firstName" id="first-name" className="form-control" placeholder="First Name" aria-describedby="helpId"
                                            value={this.state.firstName} onChange={this.onInputChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Last Name: </label>
                                        <input type="text" name="lastName" id="last-name" className="form-control" placeholder="Last Name" aria-describedby="helpId"
                                            value={this.state.lastName} onChange={this.onInputChange} />
                                    </div>
                                    <div className="form-group mb-3">
                                        <label>Email Address: </label>
                                        <input type="text" name="mailAddress" id="email-address" className="form-control" placeholder="Email Address" aria-describedby="helpId"
                                            value={this.state.mailAddress} onChange={this.onInputChange} />
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success" onClick={this.onSubmit}>Save</button>
                                        <button type="button" className="btn btn-outline-secondary" onClick={this.onCancel} style={{ marginLeft: "15px" }}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
