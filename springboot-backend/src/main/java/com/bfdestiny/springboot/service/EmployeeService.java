package com.bfdestiny.springboot.service;

import com.bfdestiny.springboot.model.Employee;

import java.util.List;

public interface EmployeeService {

    List<Employee> getAllEmployee();

    Employee saveEmployee(Employee employee);
}
