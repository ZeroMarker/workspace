package com.meessiom.train.crm.employee.repository;

import com.meessiom.train.crm.employee.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    // all crud database methods
}
