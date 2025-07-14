package com.research_blog.research_blog.controller;

import com.research_blog.research_blog.entity.dummyEntry;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("user")
public class dummyEntryController {
    private Map<Long, dummyEntry> tempStorage = new HashMap<>();

    @GetMapping
    public List<dummyEntry> getAll(){
        return new ArrayList<>(tempStorage.values());
    }

    @PostMapping
    public void createEntry(@RequestBody dummyEntry dE){
        tempStorage.put(dE.getRollNo(),dE);
    }

    @GetMapping("id/{rollNo}")
    public dummyEntry getUserByRollNo(@PathVariable long rollNo){
        return tempStorage.get(rollNo);
    }
}
