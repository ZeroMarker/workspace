package com.meessiom.train.crm.authority.controller;


import com.meessiom.train.crm.authority.model.Authority;
import com.meessiom.train.crm.authority.service.AuthorityService;
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
@RequestMapping("/authoritys")
@Slf4j
public class AuthorityController {
    @Resource
    private AuthorityService authorityService;

    @GetMapping
    public List<Authority> getAllAuthoritys(){
        log.info("Enter authority controller and get all authoritys at time : " + new Date());
        return authorityService.getAllAuthoritys();
    }

    // Build create authority REST API
    @PostMapping
    public Authority createAuthority(@RequestBody Authority authority){
        log.info("Enter authority controller and create a  authority at time : " + new Date());
        return authorityService.createAuthority(authority);
    }

    // Build get authority by id REST API
    @GetMapping("{id}")
    public ResponseEntity<Authority> getAuthorityById(@PathVariable long id){
        log.info("Enter authority controller and get authority by id  at time : " + new Date());
        Authority authority = authorityService.getAuthorityById(id);
        return ResponseEntity.ok(authority);
    }

    // Build update authority REST API
    @PutMapping("{id}")
    public ResponseEntity<Authority> updateAuthority(@PathVariable long id,@RequestBody Authority authorityDetails){
        log.info("Enter authority controller and update authority at time : " + new Date());
        Authority updateAuthority = authorityService.updateAuthority(id,authorityDetails);
        return ResponseEntity.ok(updateAuthority);
    }

    // Build delete authority REST API
    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteAuthority(@PathVariable long id){
        log.info("Enter authority controller and delete authority at time : " + new Date());
        authorityService.deleteAuthority(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }



}
