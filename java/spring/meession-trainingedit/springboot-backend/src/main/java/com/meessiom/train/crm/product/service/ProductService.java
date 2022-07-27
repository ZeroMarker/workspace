package com.meessiom.train.crm.product.service;

import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.product.model.Product;
import com.meessiom.train.crm.product.repository.ProductRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class ProductService {
    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts(){
        log.info("Enter product service and get all products at time : " + new Date().toString());
        return productRepository.findAll();
    }

    // Build create product REST API
    public Product createProduct(Product product){
        log.info("Enter product service and create a product at time : " + new Date().toString());
        return productRepository.save(product);
    }

    // Build get product by id REST API
    public Product getProductById(long id){
        log.info("Enter product service and get a product by id at time : " + new Date().toString());
        Product product = productRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Product not exist with id" + id));
        return product;
    }

    // Build update product REST API
    public Product updateProduct(long id, Product productDetails){
        log.info("Enter product service and update product at time : " + new Date().toString());
        Product updateProduct = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not exist with id"+id));
        updateProduct.setProductName(productDetails.getProductName());
        updateProduct.setProductInfo(productDetails.getProductInfo());

        productRepository.save(updateProduct);
        return updateProduct;
    }

    // Build delete product REST API
    public void deleteProduct(long id){
        log.info("Enter product service and delete a product at time : " + new Date().toString());
        Product product = productRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Product not exist with id"+id));
        productRepository.delete(product);
    }
}
