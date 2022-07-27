package com.meessiom.train.crm.employee.model;

import com.meessiom.train.crm.authority.model.Authority;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "employee_name")
    private  String employeeName;

    @Column(name="employee_sex")
    private String employeeSex;

    @Column(name="employee_dept")
    private String employeeDept;

    @Column(name="employee_office")
    private String employeeOffice;

    @Column(name="employee_phone")
    private String employeePhone;

    @ManyToOne
    @JoinColumn(name = "authority_id")
    private Authority authority;
}
