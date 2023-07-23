package com.mar.fooddelivery.service;

import com.mar.fooddelivery.pojo.Order;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

public interface OrderService {
    public ResponseEntity<String> generateOrderBill(Map<String, Object> requestMap);
    public ResponseEntity<List<Order>> getOrders();
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap);
    public ResponseEntity<String> deleteOrder(Integer id);
}