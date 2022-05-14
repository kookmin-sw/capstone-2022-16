package fleamarket.core.service;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MarketDTO;
import fleamarket.core.domain.*;
import fleamarket.core.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MarketService {
    private final ItemRepository itemRepository;
    private final ITEM_MEMBER_RESERVERELATION_Repository relationRepository;
    private final MemberRepository memberRepository;
    private final MarketRepository marketRepository;
    private final SoldoutRepository soldoutRepository;
    private final BoughtRepository boughtRepository;

    public String marektAdd(double latitude,double longitude,HttpServletRequest request){
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

    public Object getMarketInfo(Long id,HttpServletRequest request){
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

    public Object getMap(double latitude,double longitude,HttpServletRequest request){
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

    public String saveItem(Long marketId, String itemName, Long price, int sellingTime, MultipartFile photo, String description, HttpServletRequest request) throws IOException {
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return "Not Logged In";
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
        item.setDescription(description);
        item.setItemName(itemName);
        item.setPrice(price);
        item.setOwner(loggedMember);
        item.setMarket(market);
        item.setSellingTime(sellingTime);
        itemRepository.save(item);

        return "OK";
    }

    public String deleteItem(Long marketId,Long itemId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return "Not Logged In";
        }

        Item item = itemRepository.findById(itemId).get();
        if(item == null){
            return "No Item there";
        }
        itemRepository.delete(item);
        return "OK";
    }

    public String reserveMember(Long itemid, HttpServletRequest request){
        Optional<Item> NullableItem = itemRepository.findById(itemid);
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

        Member member = item.getOwner();
        if((member.getMemberId() != loggedMember.getMemberId())){
            List<ITEM_MEMBER_RESERVE_RELATION> relations = item.getReserveMembers();
            List<Long> a = new ArrayList<>();
            relations.stream().forEach(relation->{
                Member newMember = relation.getReserveMember();
                if(newMember.getMemberId() == loggedMember.getMemberId()) {
                    a.add(relation.getId());
                }
            });
            if(a.isEmpty()){
                ITEM_MEMBER_RESERVE_RELATION relation = new ITEM_MEMBER_RESERVE_RELATION();
                relation.setReserveItems(item);
                relation.setReserveMember(loggedMember);
                relationRepository.save(relation);
                return "OK";
            }
            else{
                relationRepository.deleteById(a.get(0));
            }
            return "ALREAY EXIST";
        }
        else{
            return "Its your Item";
        }
    }

    public String reserveConfirm(Long itemId, Long memberId, HttpServletRequest request){
        Optional<Item> NullableItem = itemRepository.findById(itemId);
        Item item = NullableItem.get();
        if (item == null) {
            return "Item Not Found";
        }
        HttpSession session = request.getSession();
        if (session == null) {
            return "Not Logged In";
        }

        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if (loggedMember == null) {
            return "Not Logged In";
        }
        Member member = item.getOwner();
        if(member.getMemberId() != loggedMember.getMemberId()){
            return "Not your item";
        }
        item.setConfirmedMember(member);
        return "OK";
    }

    public void soldoutItem(Long itemId, Long memberId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null)
            return;

        Item item = itemRepository.findById(itemId).get();
        Member soldMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        Member boughtMember = memberRepository.findById(memberId).get();

        if(item == null || soldMember == null || boughtMember == null){
            return;
        }

        ItemSoldout itemsoldout = new ItemSoldout();
        itemsoldout.setSoldMember(soldMember);
        itemsoldout.setItemPrice(item.getPrice());
        soldoutRepository.save(itemsoldout);

        ItemBought itembought = new ItemBought();
        itembought.setBoughtMember(boughtMember);
        itembought.setItemPrice(item.getPrice());
        boughtRepository.save(itembought);
    }
}
