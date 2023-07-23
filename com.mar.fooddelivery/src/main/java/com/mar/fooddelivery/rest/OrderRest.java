package com.mar.fooddelivery.rest;


import com.mar.fooddelivery.pojo.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/order")
public interface OrderRest {
    @PostMapping("/generate_order_bill")
    public ResponseEntity<String> generateOrderBill(@RequestBody Map<String, Object> requestMap);
    @GetMapping("/get_orders")
    public ResponseEntity<List<Order>> getOrders();
    @PostMapping("/get_pdf")
    public ResponseEntity<byte[]> getPdf(@RequestBody Map<String, Object> requestMap);
    @PostMapping("delete_by_id/{id}")
    public ResponseEntity<String> deleteOrder(@PathVariable Integer id);
}