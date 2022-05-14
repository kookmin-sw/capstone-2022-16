package fleamarket.core.controller;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.MemberDTO;
import fleamarket.core.Form.LoginForm;
import fleamarket.core.domain.ItemBought;
import fleamarket.core.domain.ItemSoldout;
import fleamarket.core.domain.Member;
import fleamarket.core.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/join")
    public Object save(@Valid @ModelAttribute Member member, BindingResult result) {
        return memberService.join(member,result);
    }

    @PostMapping("/login")
    public Object loginV4(@Valid @ModelAttribute LoginForm form, BindingResult bindingResult,
                          @RequestParam(defaultValue = "/") String redirectURL,
                          HttpServletRequest request) {

        if (bindingResult.hasErrors()) {
            return bindingResult.getAllErrors();
        }

        Member loginMember = memberService.login(form.getLoginId(), form.getPassword());

        if (loginMember == null) {
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
            return bindingResult.getAllErrors();
        }

        //로그인 성공 처리
        //세션이 있으면 있는 세션 반환, 없으면 신규 세션을 생성
        HttpSession session = request.getSession();
        //세션에 로그인 회원 정보 보관
        session.setAttribute(SessionConst.LOGIN_MEMBER, loginMember);

        return "ok";
    }

    @PostMapping("/logout")
    public String logoutV3(HttpServletRequest request) {
        //세션을 삭제한다.
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return "ok";
    }

    @GetMapping("/member/items")
    public List<ItemDTO> getSellingItems(HttpServletRequest request){
        return memberService.getItems(request);
    }

    @GetMapping("/member/reserveitems")
    public List<ItemDTO> getReserveItems(HttpServletRequest request){
        return memberService.getReserveItems(request);
    }

    @GetMapping("/member/mySoldout")
    public List<ItemSoldout> mySoldoutItems(HttpServletRequest request){
        return memberService.getMySoldouts(request);
    }

    @GetMapping("/member/myBought")
    public List<ItemBought> myBoughtItems(HttpServletRequest request){
        return memberService.getMyBoughts(request);
    }

    @GetMapping("/member/profile")
    public MemberDTO getProfile(HttpServletRequest request){
        Member member = (Member) request.getSession(false).getAttribute(SessionConst.LOGIN_MEMBER);
        return new MemberDTO(member);
    }
}