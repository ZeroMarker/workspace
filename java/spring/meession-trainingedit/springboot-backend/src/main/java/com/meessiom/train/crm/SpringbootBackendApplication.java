package com.meessiom.train.crm;

import com.meessiom.train.crm.employee.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.annotation.Resource;

/**
 * @author chenhongliang
 */
@SpringBootApplication
public class SpringbootBackendApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringbootBackendApplication.class, args);
	}

	@Resource
	private EmployeeRepository employeeRepository;





	@Override
	public void run(String... args) throws Exception {
//		Product product1 = new Product();
//		product1.setProductName("toy");
//		product1.setProductInfo("very fun");
//		productRepository.save(product1);



	}
}
