package com.blog.blogApp.ServiceImpl;

import com.blog.blogApp.Payloads.CategoryDto;
import com.blog.blogApp.Repository.CategoryRepo;
import com.blog.blogApp.Service.CategoryService;
import com.blog.blogApp.entity.Category;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    CategoryRepo categoryRepo;

    @Override
    public CategoryDto createCategory(CategoryDto categoryDto) {
        Category category=this.modelMapper.map(categoryDto, Category.class);
        Category savedCategory=this.categoryRepo.save(category);
        return this.modelMapper.map(savedCategory,CategoryDto.class);
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Integer categoryId) {
        Category category=this.categoryRepo.findById(categoryId).orElseThrow(()->new IllegalArgumentException("Category id is Not found"+categoryId));
        category.setCategoryTitle(categoryDto.getCategoryTitle());
         category.setCategoryDescription(categoryDto.getCategoryDescription());
         Category updatedCategory=this.categoryRepo.save(category);
        return this.modelMapper.map(updatedCategory,CategoryDto.class);
    }

    @Override
    public void deleteCategory(Integer categoryId) {
      Category category=this.categoryRepo.findById(categoryId).orElseThrow(()->new IllegalArgumentException("Category delete id not found"+categoryId));
      this.categoryRepo.delete(category);
    }

    @Override
    public CategoryDto getCategoryById(Integer categoryId) {
        Category category=this.categoryRepo.findById(categoryId).orElseThrow(()->new IllegalArgumentException("Category id is not found"+categoryId));
        return this.modelMapper.map(category,CategoryDto.class);
    }

    @Override
    public List<CategoryDto> getAllCategory() {
     List<Category> categoryList=this.categoryRepo.findAll();
        return categoryList.stream().map(cat->this.modelMapper.map(cat,CategoryDto.class)).collect(Collectors.toList());
    }
}
