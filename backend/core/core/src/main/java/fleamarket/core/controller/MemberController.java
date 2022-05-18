package fleamarket.core.controller;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.ItemSoldBoughtDTO;
import fleamarket.core.DTO.MemberDTO;
import fleamarket.core.Form.LoginForm;
import fleamarket.core.domain.ItemBought;
import fleamarket.core.domain.ItemSoldout;
import fleamarket.core.domain.Member;
import fleamarket.core.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.List;


@RestController
@RequiredArgsConstructor
public class MemberController {
    private final MemberService memberService;

    @PostMapping("/join")
    public Object save(@Valid @ModelAttribute Member member, @RequestParam MultipartFile photo, BindingResult result) {
        return memberService.join(member,photo,result);
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

    @GetMapping("/member/items") //현재 내가 내놓은 물건 내역
    public List<ItemDTO> getSellingItems(HttpServletRequest request){
        return memberService.getItems(request);
    }

    @GetMapping("/member/reserveitems") // 현재 내가 찜한 물건 내역
    public List<ItemDTO> getReserveItems(HttpServletRequest request){
        return memberService.getReserveItems(request);
    }

    @GetMapping("/member/mySellingReservedItems") //현재 내가 판매하는 물건중 거래예약된 내역
    public List<ItemDTO> mySellingReservedItems(HttpServletRequest request){
        return memberService.getSellingItems(request);
    }

    @GetMapping("/member/myBuyingReservedItems") //현재 내가 찜한 물건중 거래예약된 물건 내역
    public List<ItemDTO> myBuingReservedItems(HttpServletRequest request){
        return memberService.getBuyingItems(request);
    }

    @GetMapping("/member/mySoldout") //내 판매 내역
    public List<ItemSoldBoughtDTO> mySoldoutItems(@RequestParam Long memberId, HttpServletRequest request){
        return memberService.getMySoldouts(memberId, request);
    }

    @GetMapping("/member/myBought") //내 구매 내역
    public List<ItemSoldBoughtDTO> myBoughtItems(@RequestParam Long memberId, HttpServletRequest request){
        return memberService.getMyBoughts(memberId, request);
    }

    @GetMapping("/member/myprofile")
    public MemberDTO getProfile(HttpServletRequest request){
        return memberService.myProfile(request);
    }

    @GetMapping("/member/profile")
    public MemberDTO getProfile(@RequestParam Long memberId, HttpServletRequest request){
        return memberService.memberProfile(memberId, request);
    }

    @PostMapping("/member/myfasion") //착장의상 정보
    public void myFasion(@RequestParam String fasion,HttpServletRequest request){
        memberService.decribeFasion(fasion,request);
    }
}