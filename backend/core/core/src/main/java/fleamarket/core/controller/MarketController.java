package fleamarket.core.controller;

import fleamarket.core.domain.Market;
import fleamarket.core.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MarketController {
    private final MemberService memberService;
    @Autowired
    public MarketController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/market/{id}")
    public Market marketInfo(){
        String[] itemInfo = {"초콜릿","티슈"};
        Market market = new Market(itemInfo);
        return market;
    }
}
