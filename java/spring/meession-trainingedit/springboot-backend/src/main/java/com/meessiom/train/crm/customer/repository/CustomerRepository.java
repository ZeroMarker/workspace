package com.meessiom.train.crm.customer.repository;

import com.meessiom.train.crm.customer.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CustomerRepository extends JpaRepository<Customer,Long> {
    @Query(value = "SELECT * FROM customers limit ?1, ?2", nativeQuery = true)
    List<Customer> listCustomer(int pageNum, int size);

}
