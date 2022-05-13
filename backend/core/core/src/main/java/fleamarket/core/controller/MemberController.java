package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MemberDTO;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.ItemBought;
import fleamarket.core.domain.ItemSoldout;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.BoughtRepository;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MemoryMemberRepository;
import fleamarket.core.repository.SoldoutRepository;
import fleamarket.core.web.SessionConst;
import fleamarket.core.web.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemoryMemberRepository memoryMemberRepository;
    private final SoldoutRepository soldoutRepository;
    private final BoughtRepository boughtRepository;
    private final ItemRepository itemRepository;
    private final LoginService loginService;

    @PostMapping("/join")
    public Object save(@Valid @ModelAttribute Member member, BindingResult
            result) {
        if (result.hasErrors()) {
            return result.getAllErrors();
        }
        System.out.println(member.getMemberId());
        Optional<Member> temp = memoryMemberRepository.findByLoginId(member.getLoginId());
        if(temp.isEmpty()){
            memoryMemberRepository.save(member);
            return "ok";
        }
        else if(temp.get() == null){
            memoryMemberRepository.save(member);
            return "ok";
        }

        return "no";
    }

    @GetMapping("/member/items")
    public List<ItemDTO> getSellingItems(HttpServletRequest request){
        return loginService.getItems(request);
    }

    @GetMapping("/member/reserveitems")
    public List<ItemDTO> getReserveItems(HttpServletRequest request){
        return loginService.getReserveItems(request);
    }

    @PostMapping("/member/soldout")
    public void soldoutItem(@RequestParam Long itemId,@RequestParam Long memberId,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null)
            return;

        Item item = itemRepository.findById(itemId).get();
        Member soldMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        Member boughtMember = memoryMemberRepository.findById(memberId).get();

        if(item == null || soldMember == null || boughtMember == null){
            return;
        }

        ItemSoldout itemsoldout = new ItemSoldout();
        itemsoldout.setMember(soldMember);
        itemsoldout.setItemPrice(item.getPrice());
        soldoutRepository.save(itemsoldout);

        ItemBought itembought = new ItemBought();
        itembought.setMember(boughtMember);
        itembought.setItemPrice(item.getPrice());
        boughtRepository.save(itembought);
    }

    @GetMapping("/member/mySoldout")
    public List<ItemSoldout> mySoldoutItems(HttpServletRequest request){
        List<ItemSoldout> soldouts = new ArrayList<>();
        HttpSession session = request.getSession(false);
        if(session == null)
            return soldouts;

        Member soldMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(soldMember == null){
            return soldouts;
        }
        return soldMember.getSoldoutItems();
    }

    @GetMapping("/member/myBought")
    public List<ItemBought> myBoughtItems(HttpServletRequest request){
        List<ItemBought> boughts = new ArrayList<>();
        HttpSession session = request.getSession(false);
        if(session == null)
            return boughts;

        Member soldMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(soldMember == null){
            return boughts;
        }
        return soldMember.getBoughtItems();
    }

    @GetMapping("/member/profile")
    public MemberDTO getProfile(HttpServletRequest request){
        Member member = (Member) request.getSession(false).getAttribute(SessionConst.LOGIN_MEMBER);
        return new MemberDTO(member);
    }
}