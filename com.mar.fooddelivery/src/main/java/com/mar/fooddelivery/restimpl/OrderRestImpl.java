package com.mar.fooddelivery.restimpl;

import com.mar.fooddelivery.constants.FoodDeliveryMessages;
import com.mar.fooddelivery.pojo.Order;
import com.mar.fooddelivery.rest.OrderRest;
import com.mar.fooddelivery.service.OrderService;
import com.mar.fooddelivery.utilities.FoodDeliveryUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OrderRestImpl implements OrderRest {
    private final OrderService orderService;
    @Override
    public ResponseEntity<String> generateOrderBill(Map<String, Object> requestMap) {
        try {
            return orderService.generateOrderBill(requestMap);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Order>> getOrders() {
        try {
            return orderService.getOrders();
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<byte[]> getPdf(Map<String, Object> requestMap) {
        try {
            return orderService.getPdf(requestMap);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new byte[0],HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteOrder(Integer id) {
        try {
            return orderService.deleteOrder(id);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}