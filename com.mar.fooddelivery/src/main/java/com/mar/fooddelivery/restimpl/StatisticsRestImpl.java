package com.mar.fooddelivery.restimpl;

import com.mar.fooddelivery.rest.StatisticsRest;
import com.mar.fooddelivery.service.StatisticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class StatisticsRestImpl implements StatisticsRest {
    private final StatisticsService statisticsService;
    @Override
    public ResponseEntity<Map<String, Object>> getCount() {
        try {
            return statisticsService.getCount();
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new HashMap<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
