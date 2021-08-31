import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/employees";

class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employeeObj) {
        return axios.post(EMPLOYEE_API_BASE_URL, employeeObj);
    }

    getEmployeeById(id) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + id);
    }

    updateEmployee(id, employeeObj) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + id, employeeObj);
    }

    deleteEmployee(id) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + id);
    }
}

export default new EmployeeService();