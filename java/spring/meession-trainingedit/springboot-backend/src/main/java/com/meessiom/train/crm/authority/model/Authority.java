package com.meessiom.train.crm.authority.model;

import com.meessiom.train.crm.employee.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

/**
 * @author chenhongliang
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "authoritys")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "authority_name")
    private  String authorityName;

    @Column(name = "authority_dept")
    private String authorityDept;

    @Column(name = "authority_role")
    private String authorityRole;

    @Column(name = "authority_info")
    private String authorityInfo;

    @Column(name = "authority_state")
    private String authorityState;

    /**
     *
     */
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "authority_id")  //cascade
    private List<Employee> employeeList;

}
