package com.startup.website;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

    @GetMapping("/")
    public String home() {
        // This looks for a file named "index.html" in the templates folder
        return "index";
    }
}