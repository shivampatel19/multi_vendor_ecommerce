package com.shivam.repository;

import com.shivam.modal.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    //    <EntityForWhichWeWantTOCreateRepository, PrimaryKeyType>
    User findByEmail(String email);
}
