package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.MemoryMemberRepository;
import fleamarket.core.web.SessionConst;
import fleamarket.core.web.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemoryMemberRepository memoryMemberRepository;
    private final LoginService loginService;

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

    @GetMapping("/member/items")
    public List<ItemDTO> getSellingItems(HttpServletRequest request){
        return loginService.getItems(request);
    }
}