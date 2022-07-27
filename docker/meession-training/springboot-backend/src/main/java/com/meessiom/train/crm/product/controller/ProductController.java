package com.meessiom.train.crm.product.controller;


import com.meessiom.train.crm.product.model.Product;
import com.meessiom.train.crm.product.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/products")
@Slf4j
public class ProductController {
    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getAllProducts(){
        log.info("Enter product controller and get all products at time : " + new Date().toString());
        return productService.getAllProducts();
    }

    // Build create product REST API
    @PostMapping
    public Product createProduct(@RequestBody Product product){
        log.info("Enter product controller and create a  product at time : " + new Date().toString());
        return productService.createProduct(product);
    }

    // Build get product by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Product> getProductById(@PathVariable long id){
        log.info("Enter product controller and get product by id  at time : " + new Date().toString());
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // Build update product REST API
    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable long id,@RequestBody Product productDetails){
        log.info("Enter product controller and update product at time : " + new Date().toString());
        Product updateProduct = productService.updateProduct(id,productDetails);
        return ResponseEntity.ok(updateProduct);
    }

    // Build delete product REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteProduct(@PathVariable long id){
        log.info("Enter product controller and delete product at time : " + new Date().toString());
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
