package fleamarket.core.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReactController {
    public ReactController() {
    }

    @RequestMapping(value={"/market", "/member", "/map","/logout","/login","/join","/main" })
    public String HomePage() {
        System.out.println("FuckFuckFuckFuckFuckFuckFuckFuckFuckFuckFuckFuckFuckFuckFuck");
        return "index";
    }

}
