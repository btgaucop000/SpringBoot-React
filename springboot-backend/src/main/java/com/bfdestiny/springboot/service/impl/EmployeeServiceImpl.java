package com.bfdestiny.springboot.service.impl;

import com.bfdestiny.springboot.exception.ResourceNotFoundException;
import com.bfdestiny.springboot.model.Employee;
import com.bfdestiny.springboot.repository.EmployeeRepository;
import com.bfdestiny.springboot.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public List<Employee> getAllEmployee() {
        return employeeRepository.findAll();
    }

    @Override
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    @Override
    public Employee getEmployeeById(Long id) {
        return employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not exist with id: " + id));
    }

    @Override
    public Employee updateEmployee(Long id, Employee employee) {
        Employee currentEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not exist with id: " + id));
        currentEmployee.setFirstName(employee.getFirstName());
        currentEmployee.setLastName(employee.getLastName());
        currentEmployee.setMailAddress(employee.getMailAddress());
        return employeeRepository.save(currentEmployee);
    }

    @Override
    public void deleteEmployee(Long id) {
        Employee currentEmployee = employeeRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Employee not exist with id: " + id));
        employeeRepository.delete(currentEmployee);
    }
}
