package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MarketDTO;
import fleamarket.core.JSON.ItemJSON;
import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.ITEM_MEMBER_RESERVERELATION_Repository;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MarketRepository;
import fleamarket.core.service.MemberService;
import fleamarket.core.web.SessionConst;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class MarketController {
    private final MemberService memberService;
    private final MarketRepository marketRepository;
    private final ItemRepository itemRepository;
    private final ITEM_MEMBER_RESERVERELATION_Repository relationRepository;



    //마켓 등록
    @PostMapping("/market/add")
    public String addNewMarket(@RequestParam double latitude,@RequestParam double longitude,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        Market market = new Market();
        market.setLatitude(latitude);
        market.setLongitude(longitude);
        marketRepository.save(market);
        return "OK";
    }

    //특정 마켓의 아이템 리스트 반환
    @GetMapping("/market")
    public Object marketInfo(@RequestParam Long id,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        Market market = marketRepository.findById(id).get();
        List<Item> items = market.getItems();
        List<ItemDTO> itemDTOS = new ArrayList<>();
        items.stream().forEach(item -> itemDTOS.add(
                new ItemDTO(item)));
        return itemDTOS;

    }

    //특정 마켓에 아이템 등록
    @PostMapping("/market/save")
    public String itemSave(@RequestParam Long marketId, @RequestParam String itemName, @RequestParam Long price, @RequestParam int sellingTime, @RequestParam MultipartFile photo,@RequestParam String description, HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        if(photo != null) {
            if(!photo.isEmpty()) {
                String uuid = UUID.randomUUID().toString();
                String extension = photo.getOriginalFilename().substring(photo.getOriginalFilename().lastIndexOf("."));
                String fullPath = uuid+extension;
                System.out.println(fullPath);
                photo.transferTo(new File(fullPath));
            }
        }
        Item item = new Item();
        Market market = marketRepository.findById(marketId).get();
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        item.setDescription(description);
        item.setItemName(itemName);
        item.setPrice(price);
        item.setMember(loggedMember);
        item.setMarket(market);
        item.setSellingTime(sellingTime);
        itemRepository.save(item);

        return "OK";

    }

    //모든 마켓 정보 반환
    @GetMapping("/map")
    public Object marketLocationInfo(@RequestParam("lat") double latitude,@RequestParam("lng") double longitude,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        List<Market> markets = marketRepository.findAll();
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

        if((item.getMember().getMemberId() != loggedMember.getMemberId())){
            ITEM_MEMBER_RESERVE_RELATION relation = new ITEM_MEMBER_RESERVE_RELATION();
            relation.setItems(item);
            relation.setMembers(loggedMember);
            itemRepository.save(item);
            return "OK";
        }
        else{
            return "NO";
        }
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

        if(item.isSoldOut()) {
            item.setSoldOut(!item.isSoldOut());
            itemRepository.save(item);
            return "OK";
        }
        else{
            return "Not Reserved Item";
        }

    }
}
