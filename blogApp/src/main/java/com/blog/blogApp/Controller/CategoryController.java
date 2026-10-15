package com.blog.blogApp.Controller;

import com.blog.blogApp.Payloads.CategoryDto;
import com.blog.blogApp.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {
    @Autowired
    CategoryService categoryService;

    @PostMapping("/")
    public ResponseEntity<CategoryDto> createcategory(@RequestBody CategoryDto categoryDto){
        CategoryDto create=this.categoryService.createCategory(categoryDto);
        return new ResponseEntity<>(create, HttpStatus.CREATED);
    }

    @PutMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> update(@RequestBody CategoryDto categoryDto,@PathVariable Integer categoryId){
        CategoryDto updatedCategory=this.categoryService.updateCategory(categoryDto,categoryId);
        return  ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{categoryId}")
    public ResponseEntity<String> deletecategory(@PathVariable Integer categoryId){
        this.categoryService.deleteCategory(categoryId);
        return new ResponseEntity<>("Category deleted successfully",HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    public ResponseEntity<CategoryDto> getById(@PathVariable Integer categoryId){
        CategoryDto getCatById=this.categoryService.getCategoryById(categoryId);
        return ResponseEntity.ok(getCatById);
    }

    @GetMapping("/")
    public ResponseEntity<List<CategoryDto>> listResponseEntity(){
       return ResponseEntity.ok(this.categoryService.getAllCategory());

    }


}
