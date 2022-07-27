package com.meessiom.train.crm.employee.repository;

import com.meessiom.train.crm.employee.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,Long> {
    // all crud database methods
    //Employee findOneById(Long id);

    List<Employee> findByEmployeeDept(String Dept);

    Page<Employee> findAll(Pageable pageable);




//    @Query(value = "select Employee from Employee where employeeOffice = ?1")
//    public List<Employee> findByOffice(String office);

}
