package com.mar.fooddelivery.service;

import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface StatisticsService {
    public ResponseEntity<Map<String, Object>> getCount();
}