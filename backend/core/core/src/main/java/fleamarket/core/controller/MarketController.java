package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MarketDTO;
import fleamarket.core.JSON.ItemJSON;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MarketRepository;
import fleamarket.core.service.MemberService;
import fleamarket.core.web.SessionConst;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MarketController {
    private final MemberService memberService;
    private final MarketRepository marketRepository;
    private final ItemRepository itemRepository;

    //마켓 등록
    @PostMapping("/market/add")
    public String addNewMarket(@RequestParam double latitude,@RequestParam double longitude){
        Market market = new Market();
        market.setLatitude(latitude);
        market.setLongitude(longitude);
        marketRepository.save(market);
        return "OK";
    }

    //특정 마켓의 아이템 리스트 반환
    @GetMapping("/market")
    public List<ItemDTO> marketInfo(@RequestParam Long id){
        Market market = marketRepository.findById(id).get();
        List<Item> items = market.getItems();
        List<ItemDTO> itemDTOS = new ArrayList<>();
        items.stream().forEach(item -> itemDTOS.add(new ItemDTO(item.getMember().getName(),item.getItemId(),item.getItemName(),item.getDescription(), item.getPrice(),item.isReserved(),item.isSoldOut())));

        return itemDTOS;
    }

    //특정 마켓에 아이템 등록
    @PostMapping("/market/save")
    public String itemSave(@RequestParam Long marketId, @RequestParam String itemName, @RequestBody ItemJSON itemJSON, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        Item item = new Item();
        Market market = marketRepository.findById(marketId).get();
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        item.setDescription(itemJSON.getDescription());
        item.setItemName(itemName);
        item.setPrice(1000L);
        item.setMember(loggedMember);
        item.setMarket(market);
        itemRepository.save(item);

        return "OK";
    }

    //모든 마켓 정보 반환
    @GetMapping("/map")
    public List<MarketDTO> marketLocationInfo(@RequestParam("lat") double latitude,@RequestParam("lng") double longitude){
        List<Market> markets = marketRepository.findAll();
        List<ItemDTO> items = new ArrayList<>();
        List<MarketDTO> marketDTOs = new ArrayList<>();
        markets.stream().forEach(m->
                marketDTOs.add(new MarketDTO(m.getMarketId(),m.getLatitude(),m.getLongitude(),m.getItems())));
        return marketDTOs;
    }

    @PostMapping("/market/reserve")
    public String reserveItem(@RequestParam Long itemId,HttpServletRequest request){
        Optional<Item> NullableItem = itemRepository.findById(itemId);
        Item item = NullableItem.get();
        if(item == null){
            return "Item Not Found";
        }
        HttpSession session = request.getSession();
        if(session == null){
            return "Not Logged In";
        }

        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return "Not Logged In";
        }

        item.setReserved(true);
        return "OK";
    }

    @PostMapping("/market/soldout")
    public String sellItem(@RequestParam Long itemId,HttpServletRequest request){
        Optional<Item> NullableItem = itemRepository.findById(itemId);
        Item item = NullableItem.get();
        if(item == null){
            return "Item Not Found";
        }
        HttpSession session = request.getSession();
        if(session == null){
            return "Not Logged In";
        }

        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return "Not Logged In";
        }

        item.setSoldOut(true);
        return "OK";
    }
}
