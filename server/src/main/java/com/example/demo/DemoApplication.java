package com.example.demo;

import java.io.IOException;
import java.util.Collection;
import java.util.stream.Collectors;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@SpringBootApplication
public class DemoApplication {
	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
}

@Entity
class Dish {

	@Id
	@GeneratedValue
	private Long id;
	private String name;
	@Column(name = "picByte", length = 1000000000)
	private byte[] picByte;

	public Dish() {
	}

	public Dish(String name, byte[] picByte) {
		this.name = name;
		this.picByte = picByte;
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

	@Override
	public String toString() {
		return "Dish{" +
				"id=" + id +
				", name='" + name + '\'' +
				'}';
	}
}

@RepositoryRestResource
@CrossOrigin()
interface DishRepository extends JpaRepository<Dish, Long> {

}

@RestController
class DishController {

	private com.example.demo.DishRepository repository;

	public DishController(com.example.demo.DishRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/dishes")
	@CrossOrigin()
	public Collection<com.example.demo.Dish> ShowDishes() {
		return repository.findAll().stream()
				.collect(Collectors.toList());
	}

	@PostMapping("/add")
	@CrossOrigin()
	public void addDish(@RequestParam("imageFile") MultipartFile file, @RequestParam("name") String name) throws IOException {
		System.out.println("Original Image Byte Size - " + file.getBytes().length);
		Dish img = new Dish(name, file.getBytes());
		repository.save(img);
	}
}
