package fleamarket.core.controller;

import fleamarket.core.domain.Location;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.MarketLocations;
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

    @GetMapping("/map")
    public Location[] marketLocationInfo(@RequestParam("lat") double latitude,@RequestParam("lng") double longitude){

        double value = .000000004;
        Location location1 = new Location(latitude+value,longitude+value);
        Location location2 = new Location(latitude+value,longitude-value);
        Location location3 = new Location(latitude-value,longitude+value);
        Location location4 = new Location(latitude-value,longitude-value);

        Location[] marketLocations = {location1,location2,location3,location4};

        return marketLocations;
    }

}
