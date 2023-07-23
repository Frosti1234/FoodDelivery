package com.mar.fooddelivery.dao;

import com.mar.fooddelivery.pojo.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface CategoryDao extends JpaRepository<Category, Integer> {
    List<Category> getAllCategory();
}
