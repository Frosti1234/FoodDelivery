package com.mar.fooddelivery.serviceimpl;

import com.google.common.base.Strings;
import com.mar.fooddelivery.jwt.CustomerUsersDetailsService;
import com.mar.fooddelivery.jwt.JwtFilter;
import com.mar.fooddelivery.jwt.JwtUtility;
import com.mar.fooddelivery.pojo.User;
import com.mar.fooddelivery.constants.FoodDeliveryMessages;
import com.mar.fooddelivery.dao.UserDao;
import com.mar.fooddelivery.service.UserService;
import com.mar.fooddelivery.utilities.EmailUtility;
import com.mar.fooddelivery.utilities.FoodDeliveryUtility;
import com.mar.fooddelivery.wrapper.UserWrapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserDao userDao;
    @Autowired
    JwtUtility jwtUtility;
    @Autowired
    AuthenticationManager authManager;
    @Autowired
    CustomerUsersDetailsService customerUsersDetailsService;
    @Autowired
    JwtFilter jwtFilter;
    @Autowired
    EmailUtility emailUtility;

    @Override
    public ResponseEntity<String> signUp(Map<String, String> requestMap) {
        log.info("Inside signup {}", requestMap);
        try {
            if (validateSignUpMap(requestMap)) {
                User user = userDao.findByEmailId(requestMap.get("email"));
                if (Objects.isNull(user)) {
                    userDao.save(getUserFromMap(requestMap));
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.REGISTER_SUCCESS, HttpStatus.OK);
                } else {
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.EMAIL_EXISTS, HttpStatus.BAD_REQUEST);
                }
            } else {
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.INVALID_DATA, HttpStatus.BAD_REQUEST);
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private boolean validateSignUpMap(Map<String, String> requestMap) {
        if (requestMap.containsKey("name") && requestMap.containsKey("contactNumber")
                && requestMap.containsKey("email") && requestMap.containsKey("password")) {
            return true;
        }
        return false;
    }

    private User getUserFromMap(Map<String, String> requestMap) {
        User user = new User();
        user.setName(requestMap.get("name"));
        user.setContactNumber(requestMap.get("contactNumber"));
        user.setEmail(requestMap.get("email"));
        user.setPassword(requestMap.get("password"));
        user.setStatus("false");
        user.setRole("user");
        return user;
    }

    @Override
    public ResponseEntity<String> login(Map<String, String> requestMap) {
        log.info("Inside login");
        try {
            Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(requestMap.get("email"), requestMap.get("password")));
            if (authentication.isAuthenticated()) {
                if (customerUsersDetailsService.getUserDetail().getStatus().equalsIgnoreCase("true")) {
                    return new ResponseEntity<String>("{\"token\":\"" + jwtUtility.generateToken(customerUsersDetailsService.getUserDetail().getEmail(), customerUsersDetailsService.getUserDetail().getRole()) + "\"}", HttpStatus.OK);
                } else {
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.NO_APPROVAL, HttpStatus.BAD_REQUEST);
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.BAD_CREDENTIALS, HttpStatus.BAD_REQUEST);
    }

    @Override
    public ResponseEntity<List<UserWrapper>> getAllUsers() {
        try {
            if (jwtFilter.isAdmin()) return new ResponseEntity<>(userDao.getAllUsers(), HttpStatus.OK);
            else return new ResponseEntity<>(new ArrayList<>(), HttpStatus.UNAUTHORIZED);
        } catch (Exception exception) {
            exception.printStackTrace();
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> update(Map<String, String> requestMap) {
        try {
            if(jwtFilter.isAdmin()){
                Optional<User> user = userDao.findById(Integer.parseInt(requestMap.get("id")));
                if(!user.isEmpty()){
                    userDao.updateStatus(requestMap.get("status"), Integer.parseInt(requestMap.get("id")));
                    this.sendAccountStatusEmail(requestMap.get("status"),user.get().getEmail(), userDao.getAdmin());
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.USER_UPDATE_SUCCESS, HttpStatus.OK);
                } else {
                    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.USER_NOT_EXIST, HttpStatus.NO_CONTENT);
                }
            } else return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNAUTHORIZED_ACCESS,HttpStatus.UNAUTHORIZED);
        } catch (Exception exception){
            exception.printStackTrace();
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

@Override
public ResponseEntity<String> checkToken() {
             return FoodDeliveryUtility.getResponseEntity("true", HttpStatus.OK);
}

@Override
public ResponseEntity<String> changePassword(Map<String, String> requestMap) {
    try {
        User user = userDao.findByEmail(jwtFilter.getCurrentUserEmail());
        if(user != null){
            if(user.getPassword().equalsIgnoreCase(requestMap.get("oldPassword"))){
                user.setPassword(requestMap.get("newPassword"));
                userDao.save(user);
                return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.PASSWORD_UPDATE_SUCCESS, HttpStatus.OK);
            }
            return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.PASSWORD_UPDATE_WRONG_PASSWORD, HttpStatus.BAD_REQUEST);
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (Exception exception){
        exception.printStackTrace();
    }
    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
}


@Override
public ResponseEntity<String> forgotPassword(Map<String, String> requestMap) {
    try {
        User user = userDao.findByEmail(requestMap.get("email"));
        if(!Objects.isNull(user) && !Strings.isNullOrEmpty(user.getEmail())) {
            emailUtility.sendAccountDataMail(user.getEmail(), user.getPassword());
            return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.ACCOUNT_DATA_SEND, HttpStatus.OK);
        }
        return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.EMAIL_NOT_EXISTS, HttpStatus.BAD_GATEWAY);
    } catch (Exception exception){
        exception.printStackTrace();
    }
    return FoodDeliveryUtility.getResponseEntity(FoodDeliveryMessages.UNEXPECTED_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
}
private void sendAccountStatusEmail(String status, String user, String admin) {
    if(status!=null && status.equalsIgnoreCase("true"))
        emailUtility.sendSimpleMessage(user, "Account Approved","Your account is active ! \nUser email: " + user + "\nRegards! \n Changes made by:" + admin);
    else
        emailUtility.sendSimpleMessage(user, "Account Disabled","Your account is disabled ! \nUser email: " + user + "\nRegards! \n Changes made by: " + admin);
}

}
