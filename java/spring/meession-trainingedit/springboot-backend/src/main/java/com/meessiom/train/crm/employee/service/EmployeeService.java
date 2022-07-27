package com.meessiom.train.crm.employee.service;

import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.employee.model.Employee;
import com.meessiom.train.crm.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;


import javax.servlet.http.HttpServletResponse;
import java.util.List;


@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;


    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    // Build create employee REST API

    public Employee createEmployee( Employee employee){  //@RequestBody can transform json to java
        return employeeRepository.save(employee);
    }


    // Build get employee by id REST API

    public Employee getEmployeeById( long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id" + id));
        return employee;
    }

    // Build update employee REST API

    public Employee updateEmployee( long id, Employee employeeDetails){
        Employee updateEmployee = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Employee not exist with id"+id));
        updateEmployee.setEmployeeName(employeeDetails.getEmployeeName());
        updateEmployee.setEmployeeDept(employeeDetails.getEmployeeDept());
        updateEmployee.setEmployeeOffice(employeeDetails.getEmployeeOffice());
        updateEmployee.setEmployeePhone(employeeDetails.getEmployeePhone());
        updateEmployee.setEmployeeSex(employeeDetails.getEmployeeSex());

        employeeRepository.save(updateEmployee);
        return updateEmployee;
    }

    // Build delete employee REST API

    public void deleteEmployee( long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Employee not exist with id"+id));

        employeeRepository.delete(employee);


    }

    public  List<Employee> queryEmployeeByDept(String dept){
        List<Employee> employeeList = employeeRepository.findByEmployeeDept(dept);
        return employeeList;

    }

    public Page<Employee> list(int pageNum, int size){

        Pageable pageable =PageRequest.of(pageNum, size);
        return employeeRepository.findAll(pageable);
    }


}
