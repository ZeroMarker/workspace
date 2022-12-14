package com.meessiom.train.crm.customer.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.customer.model.Customer;
import com.meessiom.train.crm.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author chenhongliang
 */
@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // Build get All Customers REST API
    public List<Customer> getAllCustomers(){
        return customerRepository.findAll();
    }

    // Build create customer REST API
    public Customer createCustomer(Customer customer){
        return customerRepository.save(customer);
    }

    // Build get customer by id REST API
    public Customer getCustomerById(long id){
        return customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id" + id));
    }

    // Build update customer REST API
    public Customer updateEmployee(long id, Customer customerDetails){
        Customer updateCustomer = customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id" + id));
        updateCustomer.setCustomerName(customerDetails.getCustomerName());
        updateCustomer.setCustomerPhone(customerDetails.getCustomerPhone());
        updateCustomer.setCustomerAddress(customerDetails.getCustomerAddress());

        customerRepository.save(updateCustomer);
        return updateCustomer;
    }

    // Build delete customer REST API
    public void deleteCustomer(long id){
        Customer customer = customerRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Customer not exist with id" + id));

        customerRepository.delete(customer);
    }

    public List<Customer> listCustomer(int pageNum, int size){
//        PageHelper.startPage(pageNum, size);
//        List<Customer> customers = getAllCustomers();
//        PageInfo<Customer> pageInfo = new PageInfo<>(customers);
//        return pageInfo.getList();
        return customerRepository.listCustomer(pageNum, size);
    }
}
