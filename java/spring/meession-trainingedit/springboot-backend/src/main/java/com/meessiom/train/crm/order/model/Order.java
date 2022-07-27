package com.meessiom.train.crm.order.model;

import com.meessiom.train.crm.customer.model.Customer;
import com.meessiom.train.crm.product.model.Product;
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
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(name = "order_name")
    private  String orderName;

    @Column(name="order_info")
    private String orderInfo;

    @Column(name = "customer_phone")
    private  String orderReceiverPhone;

    @Column(name = "customer_address")
    private  String orderReceiverAddress;

    @Column(name="order_status")
    private String orderStatus;

    @Column(name="order_money")
    private String orderMoney;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToMany
    @JoinTable(
            name = "pro_order",    // 自动生成的第三方表名，可省略
            joinColumns = @JoinColumn(name = "order_id"),       // 将本表id，存储到第三方表，列名为per_id
            inverseJoinColumns = @JoinColumn(name = "product_id")       // 将对方表id，存储到第三方表，列名为dept_id
    )
    private List<Product> productList;

}
