package com.mar.fooddelivery.pojo;

import lombok.Data;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.*;
import java.io.Serializable;

@NamedQuery(name = "Order.getOrders", query = "select o from Order o order by o.id desc")
@NamedQuery(name = "Order.getOrderByUsername", query = "select o from Order o where o.createdBy=:username order by o.id desc")

@Table(name = "`order`")
@Data
@Entity
@DynamicInsert
@DynamicUpdate
public class Order implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String uuid;
    private String name;
    private String email;
    private String contactNumber;
    private String paymentMethod;
    private Double total;
    @Column(name = "product_detail", columnDefinition = "json")
    private String productDetail;
    private String createdBy;
}