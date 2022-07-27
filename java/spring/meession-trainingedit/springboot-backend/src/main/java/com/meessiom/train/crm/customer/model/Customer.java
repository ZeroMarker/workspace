package com.meessiom.train.crm.customer.model;


import com.meessiom.train.crm.order.model.Order;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "customer_name")
    private  String customerName;

    @Column(name="customer_sex")
    private String customerSex;

    @Column(name="customer_phone")
    private String customerPhone;

    @Column(name="customer_address")
    private String customerAddress;

    @OneToMany
    @JoinColumn(name = "customer_id")
    private List<Order> orderList;

}
