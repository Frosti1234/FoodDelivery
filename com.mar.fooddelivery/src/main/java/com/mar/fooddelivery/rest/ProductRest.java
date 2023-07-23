package com.mar.fooddelivery.rest;

import com.mar.fooddelivery.wrapper.ProductWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/product")
public interface ProductRest {
    @PostMapping("/add")
    public ResponseEntity<String> addProduct(@RequestBody Map<String, String> requestMap);
    @GetMapping("/get")
    public ResponseEntity<List<ProductWrapper>> getAllProducts();
    @PostMapping("/update")
    public ResponseEntity<String> updateProduct(@RequestBody Map<String, String> requestMap);
    @PostMapping("/delete/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable Integer id);
    @PostMapping("/update_status")
    public ResponseEntity<String> updateStatus(@RequestBody Map<String, String> requestMap);
    @GetMapping("/get_by_category/{id}")
    public ResponseEntity<List<ProductWrapper>> getByCategory(@PathVariable Integer id);
    @GetMapping("/get_by_id/{id}")
    public ResponseEntity<ProductWrapper> getById(@PathVariable Integer id);
}