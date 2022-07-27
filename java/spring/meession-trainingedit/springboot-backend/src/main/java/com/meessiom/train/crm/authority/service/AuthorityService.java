package com.meessiom.train.crm.authority.service;

import com.meessiom.train.crm.common.exception.ResourceNotFoundException;
import com.meessiom.train.crm.authority.model.Authority;
import com.meessiom.train.crm.authority.repository.AuthorityRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@Slf4j
public class AuthorityService {
    @Autowired
    private AuthorityRepository authorityRepository;

    public List<Authority> getAllAuthoritys(){
        log.info("Enter authority service and get all authoritys at time : " + new Date().toString());
        return authorityRepository.findAll();
    }

    // Build create authority REST API
    public Authority createAuthority(Authority authority){
        log.info("Enter authority service and create a authority at time : " + new Date().toString());
        return authorityRepository.save(authority);
    }

    // Build get authority by id REST API
    public Authority getAuthorityById(long id){
        log.info("Enter authority service and get a authority by id at time : " + new Date().toString());
        Authority authority = authorityRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Authority not exist with id" + id));
        return authority;
    }

    // Build update authority REST API
    public Authority updateAuthority(long id, Authority authorityDetails){
        log.info("Enter authority service and update authority at time : " + new Date().toString());
        Authority updateAuthority = authorityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Authority not exist with id"+id));
        updateAuthority.setAuthorityName(authorityDetails.getAuthorityName());
        updateAuthority.setAuthorityInfo(authorityDetails.getAuthorityInfo());
        updateAuthority.setAuthorityDept(authorityDetails.getAuthorityDept());
        updateAuthority.setAuthorityRole(authorityDetails.getAuthorityRole());
        updateAuthority.setAuthorityState(authorityDetails.getAuthorityState());


        authorityRepository.save(updateAuthority);
        return updateAuthority;
    }

    // Build delete authority REST API
    public void deleteAuthority(long id){
        log.info("Enter authority service and delete a authority at time : " + new Date().toString());
        Authority authority = authorityRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Authority not exist with id"+id));
        authorityRepository.delete(authority);
    }
}
