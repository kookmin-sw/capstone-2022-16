package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.MemoryMemberRepository;
import fleamarket.core.web.SessionConst;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemoryMemberRepository memoryMemberRepository;

    @PostMapping("/join")
    public Object save(@Valid @ModelAttribute Member member, BindingResult
            result) {
        if (result.hasErrors()) {
            return result.getAllErrors();
        }
        System.out.println(member.getMemberId());
        memoryMemberRepository.save(member);
        return "ok";
    }

    @GetMapping("/meber/items")
    public List<ItemDTO> getSellingItems(HttpServletRequest request){
        List<ItemDTO> itemDTOs = new ArrayList<>();
        HttpSession session = request.getSession();
        if(session == null){
           return itemDTOs;
        }
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        List<Item> items = loggedMember.getItems();
        items.stream().forEach(item -> itemDTOs.add(new ItemDTO(item.getItemId(),item.getItemName(),item.getPrice(),item.isReserved())));
        return itemDTOs;
    }
}