package com.example.demo;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableResourceServer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;
import org.springframework.web.multipart.MultipartFile;

@EnableResourceServer
@SpringBootApplication
public class DemoApplication {

  public static void main(String[] args) {
    SpringApplication.run(DemoApplication.class, args);
  }

  @Bean
  public FilterRegistrationBean<CorsFilter> simpleCorsFilter() {
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowCredentials(true);
    config.setAllowedOrigins(Collections.singletonList("http://localhost:4200"));
    config.setAllowedMethods(Collections.singletonList("*"));
    config.setAllowedHeaders(Collections.singletonList("*"));
    source.registerCorsConfiguration("/**", config);
    FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter(source));
    bean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    return bean;
  }
}

@Entity
class Dish {

  @Id
  @GeneratedValue
  private Long id;
  private String name;
  @Column(name = "picByte", nullable = true, length = 1000000000)
  private byte[] picByte;
  private boolean breakfast;
  private boolean lunch;
  private boolean dinner;

  public Dish() {
  }

  public Dish(String name, byte[] picByte, boolean breakfast, boolean lunch, boolean dinner) {
    this.name = name;
    this.picByte = picByte;
    this.breakfast = breakfast;
    this.lunch = lunch;
    this.dinner = dinner;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public byte[] getPicByte() {
    return picByte;
  }

  public void setPicByte(byte[] picByte) {
    this.picByte = picByte;
  }

  public boolean isBreakfast() {
    return breakfast;
  }

  public void setBreakfast(boolean breakfast) {
    this.breakfast = breakfast;
  }

  public boolean isLunch() {
    return lunch;
  }

  public void setLunch(boolean lunch) {
    this.lunch = lunch;
  }

  public boolean isDinner() {
    return dinner;
  }

  public void setDinner(boolean dinner) {
    this.dinner = dinner;
  }

  @Override
  public String toString() {
    return "Dish{" +
        "id=" + id +
        ", name='" + name + '\'' +
        '}';
  }
}

interface DishRepository extends JpaRepository<Dish, Long> {

}

@RestController
class DishController {

  private com.example.demo.DishRepository repository;

  public DishController(com.example.demo.DishRepository repository) {
    this.repository = repository;
  }

  @GetMapping("/dishes")
  public Collection<com.example.demo.Dish> getDishes() {
    return repository.findAll().stream()
        .collect(Collectors.toList());
  }

  @PatchMapping("/dishes/{id}")
  public void patchDish(@PathVariable(value = "id") long id,
      @RequestParam(value = "imageFile", required = false) MultipartFile file,
      @RequestParam(value = "name", required = false) String name,
      @RequestParam(value = "breakfast", required = false) boolean breakfast,
      @RequestParam(value = "lunch", required = false) boolean lunch,
      @RequestParam(value = "dinner", required = false) boolean dinner) throws IOException {
    Dish dish = repository.findById(id).get();
    if (name != null) {
      dish.setName(name);
    }
    if (file != null) {
      dish.setPicByte(file.getBytes());
    }
    dish.setBreakfast(breakfast);
    dish.setLunch(lunch);
    dish.setDinner(dinner);
    repository.save(dish);
  }

  @GetMapping("/dishes/{id}")
  public Dish getDish(@PathVariable(value = "id") long id) {
    return repository.findById(id).get();
  }

  @PostMapping("/dishes")
  public void addDish(@RequestParam(value = "imageFile", required = false) MultipartFile file,
      @RequestParam("name") String name, @RequestParam("breakfast") boolean breakfast,
      @RequestParam("lunch") boolean lunch, @RequestParam("dinner") boolean dinner)
      throws IOException {
    Dish img = new Dish(name, file == null ? null : file.getBytes(), breakfast, lunch, dinner);
    repository.save(img);
  }

  @DeleteMapping("/dishes/{id}")
  public void deleteDish(@PathVariable(value = "id") long id) {
    repository.deleteById(id);
  }
}
