package fleamarket.core.service;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.domain.*;
import fleamarket.core.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemoryMemberRepository memberRepository;
    private final SoldoutRepository soldoutRepository;
    private final BoughtRepository boughtRepository;
    private final ItemRepository itemRepository;

    public Object join(Member member, BindingResult result) {
        if (result.hasErrors()) {
            return result.getAllErrors();
        }
        System.out.println(member.getMemberId());
        Optional<Member> temp = memberRepository.findByLoginId(member.getLoginId());
        if(temp.isEmpty()){
            memberRepository.save(member);
            return "ok";
        }
        else if(temp.get() == null){
            memberRepository.save(member);
            return "ok";
        }
        return "no";
    }

    public Member login(String loginId, String password) {
        return memberRepository.findByLoginId(loginId)
                .filter(m -> m.getPassword().equals(password))
                .orElse(null);
    }

    public List<ItemSoldout> getMySoldouts(HttpServletRequest request){
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

    public List<ItemDTO> getItems(HttpServletRequest request){
        HttpSession session = request.getSession();
        List<ItemDTO> itemDTOs = new ArrayList<>();
        if(session == null){
            return itemDTOs;
        }
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        if(loggedMember == null){
            return itemDTOs;
        }
        Member realMember = memberRepository.findById(loggedMember.getMemberId()).get();
        List<Item> items = realMember.getMyItems();
        items.stream().forEach(item -> itemDTOs.add(
                new ItemDTO(item)));
        return itemDTOs;
    }

    public List<ItemDTO> getReserveItems(HttpServletRequest request){
        HttpSession session = request.getSession();
        List<ItemDTO> itemDTOs = new ArrayList<>();
        if(session == null){
            return itemDTOs;
        }
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);

        if(loggedMember == null){
            return itemDTOs;
        }
        Member realMember = memberRepository.findById(loggedMember.getMemberId()).get();
        List<ITEM_MEMBER_RESERVE_RELATION> items_reserve_relation = realMember.getReserveItems();

        List<Item> items = items_reserve_relation.stream().map(relation -> relation.getReserveItems()).collect(Collectors.toList());
        items.stream().forEach(item -> itemDTOs.add(
                new ItemDTO(item)));
        return itemDTOs;
    }

    public List<ItemBought> getMyBoughts(HttpServletRequest request){
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

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}