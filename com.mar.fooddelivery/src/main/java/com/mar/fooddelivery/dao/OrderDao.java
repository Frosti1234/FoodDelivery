package com.mar.fooddelivery.dao;

import com.mar.fooddelivery.pojo.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
public interface OrderDao extends JpaRepository<Order, Integer> {
    List<Order> getOrders();
    List<Order> getOrderByUsername(@Param("username") String username);
}
