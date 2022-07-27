package com.meessiom.train.crm.user.repository;

import com.meessiom.train.crm.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author chenhongliang
 */
@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserName(String userName);
}
