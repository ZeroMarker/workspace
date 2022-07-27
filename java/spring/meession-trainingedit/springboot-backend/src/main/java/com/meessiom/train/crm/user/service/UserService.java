package com.meessiom.train.crm.user.service;

import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.user.model.User;
import com.meessiom.train.crm.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Date;
import java.util.List;

/**
 * @author chenhongliang
 */
@Service
@Slf4j
public class UserService {

    @Resource
    private UserRepository userRepository;

    public List<User> getAllUsers(){
        log.info("Enter user service and get all users at time : " + new Date());
        return userRepository.findAll();
    }

    // Build create user REST API
    public User createUser(User user){
        log.info("Enter user service and create a user at time : " + new Date());
        return userRepository.save(user);
    }

    // Build get user by id REST API
    public User getUserById(long id){
        log.info("Enter user service and get a user by id at time : " + new Date());
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("User not exist with id" + id));
    }

    // Build update user REST API
    public User updateUser(long id, User userDetails){
        log.info("Enter user service and update user at time : " + new Date());
        User updateUser = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not exist with id"+id));
        updateUser.setUserName(userDetails.getUserName());
        updateUser.setUserPassword(userDetails.getUserPassword());

        userRepository.save(updateUser);
        return updateUser;
    }

    // Build delete user REST API
    public void deleteUser(long id){
        log.info("Enter user service and delete a user at time : " + new Date());
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not exist with id"+id));
        userRepository.delete(user);
    }
    public User findByUserName(String userName){

        return userRepository.findByUserName(userName);
    }
}
