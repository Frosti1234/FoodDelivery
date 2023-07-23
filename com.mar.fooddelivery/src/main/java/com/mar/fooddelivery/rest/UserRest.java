package com.mar.fooddelivery.rest;

import com.mar.fooddelivery.wrapper.UserWrapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Map;

@RequestMapping(path = "/user")
public interface UserRest {
    @PostMapping(path = "/signup")
    public ResponseEntity<String> signUp(@RequestBody(required = true) Map<String, String> requestMap);
    @PostMapping(path = "/login")
    public ResponseEntity<String> login(@RequestBody(required = true) Map<String, String> requestMap);
    @GetMapping(path = "/get_all_users")
    public ResponseEntity<List<UserWrapper>> getAllUsers();
    @PostMapping(path = "/update")
    public ResponseEntity<String> update(@RequestBody Map<String, String> requestMap);
    @GetMapping(path = "/check_token")
    public ResponseEntity<String> checkToken();
    @PostMapping(path = "/change_password")
    public ResponseEntity<String> changePassword(@RequestBody Map<String, String> requestMap);
    @PostMapping(path = "/forgot_password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> requestMap);
}
