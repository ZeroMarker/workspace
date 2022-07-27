package com.meessiom.train.crm.customer.controller;


import com.meessiom.train.crm.customer.model.Customer;
import com.meessiom.train.crm.customer.service.CustomerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // Build get customers REST API
    @GetMapping
    public List<Customer> getAllCustomers(){
        return customerService.getAllCustomers();
    }

    // Build create customer REST API
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer){
        return customerService.createCustomer(customer);
    }

    // Build get customer by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable long id){
        Customer customer = customerService.getCustomerById(id);
        return ResponseEntity.ok(customer);
    }

    // Build update customer REST API
    @PutMapping("{id}")
    public ResponseEntity<Customer> deleteCustomer(@PathVariable long id,@RequestBody Customer customerDetails){
        Customer updateCustomer = customerService.updateEmployee(id,customerDetails);

        return ResponseEntity.ok(updateCustomer);
    }

    // Build delete customer REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteCustomer(@PathVariable long id){
        customerService.deleteCustomer(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
