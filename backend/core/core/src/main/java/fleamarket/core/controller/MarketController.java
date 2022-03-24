package fleamarket.core.controller;

import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MarketRepository;
import fleamarket.core.service.MemberService;
import fleamarket.core.web.SessionConst;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MarketController {
    private final MemberService memberService;
    private final MarketRepository marketRepository;
    private final ItemRepository itemRepository;

    @PostMapping("/market/add/{latitude}/{longitude}")
    public String addNewMarket(@RequestParam double latitude,@RequestParam double longitude){
        Market market = new Market();
        market.setLatitude(latitude);
        market.setLongitude(longitude);
        marketRepository.save(market);
        return "OK";
    }

    @GetMapping("/market/{id}")
    public List<Item> marketInfo(@RequestParam Long id){
        Market market = marketRepository.findById(id).get();
        List<Item> items = market.getItems();

        return items;
    }

    @PostMapping("/market/{id}/save/{itemName}")
    public String itemSave(@RequestParam Long id, @RequestParam String itemName, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }
        Item item = new Item();
        Market market = marketRepository.findById(id).get();
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        item.setItemName(itemName);
        item.setPrice(1000L);
        item.setMember(loggedMember);
        item.setMarket(market);
        itemRepository.save(item);

        return "OK";
    }

    @GetMapping("/map")
    public List<Market> marketLocationInfo(@RequestParam("lat") double latitude,@RequestParam("lng") double longitude){
        List<Market> markets = marketRepository.findAll();
        return markets;
    }

}
