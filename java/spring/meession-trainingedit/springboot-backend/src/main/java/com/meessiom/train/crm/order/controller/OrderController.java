package com.meessiom.train.crm.order.controller;


import com.meessiom.train.crm.order.model.Order;
import com.meessiom.train.crm.order.service.OrderService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/orders")
@Slf4j
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping
    public List<Order> getAllOrders(){
        log.info("Enter order controller and get all orders at time : " + new Date().toString());
        return orderService.getAllOrders();
    }

    // Build create order REST API
    @PostMapping
    public Order createOrder(@RequestBody Order order){
        log.info("Enter order controller and create a  order at time : " + new Date().toString());
        return orderService.createOrder(order);
    }

    // Build get order by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable long id){
        log.info("Enter order controller and get order by id  at time : " + new Date().toString());
        Order order = orderService.getOrderById(id);
        return ResponseEntity.ok(order);
    }

    // Build update order REST API
    @PutMapping("{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable long id,@RequestBody Order orderDetails){
        log.info("Enter order controller and update order at time : " + new Date().toString());
        Order updateOrder = orderService.updateOrder(id,orderDetails);
        return ResponseEntity.ok(updateOrder);
    }

    // Build delete order REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteOrder(@PathVariable long id){
        log.info("Enter order controller and delete order at time : " + new Date().toString());
        orderService.deleteOrder(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
