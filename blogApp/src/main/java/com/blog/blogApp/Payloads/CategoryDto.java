package com.blog.blogApp.Payloads;
import com.blog.blogApp.entity.Post;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
@Data

public class CategoryDto {
    private Integer categoryId;
    private String categoryTitle;
    private String categoryDescription;

   // private List<Post> postList=new ArrayList<>();

}
