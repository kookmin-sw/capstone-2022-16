package fleamarket.core.controller;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MemberDTO;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemoryMemberRepository;
import fleamarket.core.web.SessionConst;
import fleamarket.core.web.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

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

    @GetMapping("/member/profile")
    public MemberDTO getProfile(HttpServletRequest request){
        Member member = (Member) request.getSession(false).getAttribute(SessionConst.LOGIN_MEMBER);
        return new MemberDTO(member);
    }
}