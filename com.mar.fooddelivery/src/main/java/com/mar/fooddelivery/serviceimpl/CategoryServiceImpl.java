package com.mar.fooddelivery.serviceimpl;


import com.google.common.base.Strings;
import com.mar.fooddelivery.constants.FoodDeliveryMessages;
import com.mar.fooddelivery.dao.CategoryDao;
import com.mar.fooddelivery.jwt.JwtFilter;
import com.mar.fooddelivery.pojo.Category;
import com.mar.fooddelivery.service.CategoryService;
import com.mar.fooddelivery.utilities.FoodDeliveryUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryDao categoryDao;
    private final JwtFilter jwtFilter;
    @Override
    public ResponseEntity<String> addCategory(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(this.validateCategoryMap(requestMap, false)){
                    categoryDao.save(getCategoryFromMap(requestMap, false));
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.CATEGORY_ADD_SUCCESS, HttpStatus.OK);
                }
            }else {
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<Category>> getCategories(String filterValue) {
        try {
            if(!Strings.isNullOrEmpty(filterValue) && filterValue.equalsIgnoreCase("true"))
                return new ResponseEntity<>(categoryDao.getAllCategory(), HttpStatus.OK);
            return new ResponseEntity<>(categoryDao.findAll(), HttpStatus.OK);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return new ResponseEntity<List<Category>>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateCategory(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                if(validateCategoryMap(requestMap, true)){
                    Optional<Category> category = categoryDao.findById(Integer.parseInt(requestMap.get("id")));
                    if(!category.isEmpty()){
                        categoryDao.save(this.getCategoryFromMap(requestMap, true));
                        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.CATEGORY_UPDATE_SUCCESS + requestMap.get("id"), HttpStatus.OK);
                    } else {
                        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.CATEGORY_NOT_EXIST + requestMap.get("id"),HttpStatus.BAD_REQUEST);
                    }
                }
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
            return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNAUTHORIZED_ACCESS, HttpStatus.UNAUTHORIZED);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateCategoryMap(Map<String, String> requestMap, boolean validateId) {
        if(requestMap.containsKey("name")){
            if(requestMap.containsKey("id") && validateId){
                return true;
            }
            return !validateId;
        }
        return false;
    }
    private Category getCategoryFromMap(Map<String, String> requestMap, Boolean isAdd){
        Category category = new Category();
        if(isAdd){
            category.setId(Integer.parseInt(requestMap.get("id")));
        }
        category.setName(requestMap.get("name"));
        return category;
    }

}