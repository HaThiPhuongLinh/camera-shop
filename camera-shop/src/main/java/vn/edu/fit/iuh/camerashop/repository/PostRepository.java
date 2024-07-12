package vn.edu.fit.iuh.camerashop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.edu.fit.iuh.camerashop.entity.Post;

public interface PostRepository extends JpaRepository<Post, Long> {

}