package com.meessiom.train.crm.employee.controller;

import cn.hutool.json.JSONUtil;
import cn.hutool.poi.excel.ExcelReader;
import cn.hutool.poi.excel.ExcelUtil;
import cn.hutool.poi.excel.ExcelWriter;
import com.meessiom.train.crm.employee.model.Employee;
import com.meessiom.train.crm.employee.repository.EmployeeRepository;
import com.meessiom.train.crm.employee.service.EmployeeService;
import lombok.extern.slf4j.Slf4j;
import net.bytebuddy.implementation.bytecode.constant.DefaultValue;
import org.apache.catalina.connector.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.io.Writer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


//@CrossOrigin(origins = "http://locahost:3000/") // 只允许指定网站访问
@CrossOrigin("*") // 允许所有网站访问
@RestController
@Slf4j
@RequestMapping("/employees")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @GetMapping
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    // Build create employee REST API
    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee){  //@RequestBody can transform json to java
        return employeeService.createEmployee(employee);
    }


    // Build get employee by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable long id){
        Employee employee = employeeService.getEmployeeById(id);
        return ResponseEntity.ok(employee);
    }

    @GetMapping("/s/{employeeDept}")
    public ResponseEntity<List<Employee>> queryEmployeeByEmployeeDept(@PathVariable String employeeDept){
        List<Employee> employeeList = employeeService.queryEmployeeByDept(employeeDept);
        return ResponseEntity.ok(employeeList);
    }


    // Build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id,@RequestBody Employee employeeDetails){
       Employee updateEmployee = employeeService.updateEmployee(id,employeeDetails);
       return ResponseEntity.ok(updateEmployee);
    }

    // Build delete employee REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteEmployee(@PathVariable long id){
        employeeService.deleteEmployee(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/export")
    public void export(){
        List<Employee> employeeList = getAllEmployees();
        ExcelWriter writer = ExcelUtil.getWriter(true);
        writer.addHeaderAlias("employeeName", "名字");
        writer.write(employeeList, true);
    }

    @PostMapping("/importFile")
    public void importFile(@RequestParam("file") MultipartFile file) throws IOException {
        //fileName 文件名
        String fileName = file.getOriginalFilename();
        boolean xlsx = fileName.endsWith(".xlsx");
        if (!xlsx) {
            log.error("请上传以.xlsx结尾的文件");
        }
        //得到文件流
        InputStream inputStream = file.getResource().getInputStream();
        ExcelReader reader = ExcelUtil.getReader(inputStream);

        //hutool读取excel 1：表示表格头所在行，2：从第几行开始读取，2147483647：行的最大值
        //因为自定义了表格头别名，所以只能使用map接收，如果没有设置别名，可以使用实体接收
        List<Map<String, Object>> readAll = reader.read(0,0,2147483647);
        for (int i = 0; i < readAll.size(); i++) {
            Map<String, Object> quMap = readAll.get(i);
            //获取表格中的数据
            String repos =  quMap.get("编号").toString();
            String quType =  quMap.get("数据").toString();
        }
    }
    @GetMapping("/list")
    public Page<Employee> list(@RequestParam(defaultValue = "1") int pageNum,
                               @RequestParam(defaultValue = "2") int size){
        pageNum = pageNum - 1;
        return employeeService.list(pageNum, size);
    }

}



