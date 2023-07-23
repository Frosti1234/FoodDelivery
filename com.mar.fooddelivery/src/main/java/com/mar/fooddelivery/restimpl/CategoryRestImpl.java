package com.mar.fooddelivery.restimpl;


import com.mar.fooddelivery.constants.FoodDeliveryMessages;
import com.mar.fooddelivery.pojo.Category;
import com.mar.fooddelivery.rest.CategoryRest;
import com.mar.fooddelivery.service.CategoryService;
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
public class CategoryRestImpl implements CategoryRest {
    private final CategoryService categoryService;
    @Override
    public ResponseEntity<String> addCategory(Map<String, String> requestMap) {
        try {
            return categoryService.addCategory(requestMap);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Category>> getCategories(String filterValue) {
        try {
            return categoryService.getCategories(filterValue);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {
        try {
            return categoryService.updateCategory(requestMap);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}