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
import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MarketService {

    private final ItemRepository itemRepository;
    private final ITEM_MEMBER_RESERVERELATION_Repository relationRepository;
    private final MemberRepository memberRepository;
    private final MarketRepository marketRepository;
    private final SoldoutRepository soldoutRepository;
    private final BoughtRepository boughtRepository;
    private final AwsS3Service awsS3Service;

    public String marketAdd(double latitude,double longitude,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null){
            return "Not logged In";
        }

        List<Market> markets = marketRepository.findAll();
        List<Market> nearMarkets = markets.stream().filter(market -> (market.getLatitude()-latitude)*(market.getLatitude()-latitude) + (market.getLongitude()-longitude)*(market.getLongitude()-longitude)<0.00000158369).collect(Collectors.toList());
        if(nearMarkets.isEmpty()) {
            Market market = new Market();
            market.setLatitude(latitude);
            market.setLongitude(longitude);
            marketRepository.save(market);
            return "OK";
        }
        return "NO";
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
                new ItemDTO(item, awsS3Service.downloadFile(item.getImagePath()),null)));
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
                marketDTOs.add(new MarketDTO(m)));
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

        Item item = new Item();
        Market market = marketRepository.findById(marketId).get();
        item.setDescription(description);
        item.setItemName(itemName);
        item.setPrice(price);
        item.setOwner(loggedMember);
        item.setMarket(market);
        item.setSellingTime(sellingTime);

        String fileName = awsS3Service.uploadFile(photo);
        item.setImagePath(fileName);
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
        Member owner = item.getOwner();
        if(owner.getMemberId() != loggedMember.getMemberId()){
            return "Not your item";
        }
        Member reserveMember = memberRepository.findById(memberId).get();
        if(reserveMember == null){
            return "No member there";
        }
        item.setConfirmedMember(reserveMember);
        itemRepository.save(item);
        return "OK";
    }

    public void soldoutItem(Long itemId, Long memberId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null)
            return;

        Item item = itemRepository.findById(itemId).get();
        itemRepository.save(item);
        Member owner = item.getOwner();
        Member loggedMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return;
        }
        Member soldMember = memberRepository.findById(loggedMember.getMemberId()).get();
        Member boughtMember = memberRepository.findById(memberId).get();

        if(item == null || soldMember == null || boughtMember == null || owner.getMemberId() != soldMember.getMemberId()){
            return;
        }

        item.setSoldOut(true);
        item.setMarket(null);
        itemRepository.save(item);
        ItemBought itembought = new ItemBought();
        itembought.setImagePath(item.getImagePath());
        itembought.setBoughtMember(boughtMember);
        itembought.setItemPrice(item.getPrice());
        itembought.setItemName(item.getItemName());
        boughtRepository.save(itembought);
    }

    public void boughtItem(Long itemId, Long memberId, HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null)
            return;

        Item item = itemRepository.findById(itemId).get();
        Member owner = item.getOwner();
        Member confirmedMember = item.getConfirmedMember();

        Member boughtMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        Member soldMember = memberRepository.findById(memberId).get();

        if(item == null || soldMember == null || boughtMember == null || owner==null || confirmedMember == null || boughtMember.getMemberId() != confirmedMember.getMemberId()){
            return;
        }

        item.setBought(true);
        itemRepository.save(item);
        ItemSoldout itemsoldout = new ItemSoldout();
        itemsoldout.setSoldMember(soldMember);
        itemsoldout.setItemPrice(item.getPrice());
        itemsoldout.setItemName(item.getItemName());
        soldoutRepository.save(itemsoldout);
    }

}
