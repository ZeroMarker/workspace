package com.meessiom.train.crm.user.controller;

import com.meessiom.train.crm.user.model.User;
import com.meessiom.train.crm.user.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author chenhongliang
 */
@CrossOrigin("*")
@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {

    @Resource
    private UserService userService;


    /**
     * fetch all users data
     * @return List<User>
     */
    @GetMapping
    public List<User> getAllUsers(){
        log.info("Enter user controller and get all users at time : " + new Date());
        return userService.getAllUsers();
    }

    /**
     * create a user
     * @param user get a user
     * @return User
     */
    @PostMapping
    public User createUser(@RequestBody User user){
        log.info("Enter user controller and create a  user at time : " + new Date());
        return userService.createUser(user);
    }

    /**
     * get user by id
     * @param id get a id
     * @return ResponseEntity<User>
     */
    @GetMapping("{id}")
    public ResponseEntity<User> getUserById(@PathVariable long id){
        log.info("Enter user controller and get user by id  at time : " + new Date());
        User user = userService.getUserById(id);
        return ResponseEntity.ok(user);
    }

    /**
     * update user
     * @param id user id
     * @param userDetails user details
     * @return ResponseEntity<User>
     */
    @PutMapping("{id}")
    public ResponseEntity<User> updateUser(@PathVariable long id,@RequestBody User userDetails){
        log.info("Enter user controller and update user at time : " + new Date());
        User updateUser = userService.updateUser(id,userDetails);
        return ResponseEntity.ok(updateUser);
    }

    /**
     * delete user
     * @param id user id
     * @return ResponseEntity<HttpStatus>
     */
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable long id){
        log.info("Enter user controller and delete user at time : " + new Date());
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/login")
    public String login(@RequestParam(defaultValue = "admin") String userName,
                         @RequestParam(defaultValue = "123456") String password) {
        //如果用户名和密码正确
        User user;

        user = userService.findByUserName(userName);

        if(user == null){
            return "用户不存在";
        }
        else if(user.getUserPassword().equals(password)) {
            return "登录成功";
        }

        else {
            return "密码不正确";
        }


    }
    

}
