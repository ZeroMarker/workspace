package com.meessiom.train.crm.order.service;

import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.order.model.Order;
import com.meessiom.train.crm.order.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;

    public List<Order> getAllOrders(){
        log.info("Enter order service and get all orders at time : " + new Date().toString());
        return orderRepository.findAll();
    }

    // Build create order REST API
    public Order createOrder(Order order){
        log.info("Enter order service and create a order at time : " + new Date().toString());
        return orderRepository.save(order);
    }

    // Build get order by id REST API
    public Order getOrderById(long id){
        log.info("Enter order service and get a order by id at time : " + new Date().toString());
        Order order = orderRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Order not exist with id" + id));
        return order;
    }

    // Build update order REST API
    public Order updateOrder(long id, Order orderDetails){
        log.info("Enter order service and update order at time : " + new Date().toString());
        Order updateOrder = orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Order not exist with id"+id));
        updateOrder.setCustomer(orderDetails.getCustomer());
        updateOrder.setOrderReceiverAddress(orderDetails.getOrderReceiverAddress());

        orderRepository.save(updateOrder);
        return updateOrder;
    }

    // Build delete order REST API
    public void deleteOrder(long id){
        log.info("Enter order service and delete a order at time : " + new Date().toString());
        Order order = orderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Order not exist with id"+id));
        orderRepository.delete(order);
    }
}
