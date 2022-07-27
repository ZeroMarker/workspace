package com.meessiom.train.crm.customer.controller;


import com.github.pagehelper.PageHelper;
import com.meessiom.train.crm.customer.model.Customer;
import com.meessiom.train.crm.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.List;

/**
 * @author chenhongliang
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/customers")
public class CustomerController {

    @Resource
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

    @GetMapping("list")
    public List<Customer> listCustomer(@RequestParam() int pageNum,
                                       @RequestParam() int size){
        pageNum = pageNum * size - 1;
        return customerService.listCustomer(pageNum - 1, size);
    }
}
