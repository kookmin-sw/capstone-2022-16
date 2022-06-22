package fleamarket.core.service;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.DTO.ItemSoldBoughtDTO;
import fleamarket.core.DTO.MemberDTO;
import fleamarket.core.domain.*;
import fleamarket.core.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.web.multipart.MultipartFile;

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
    private final AwsS3Service awsS3Service;
    private final MarketEnterRepository marketEnterRepository;

    public Object join(Member member, MultipartFile photo, BindingResult result) {
        if (result.hasErrors()) {
            return result.getAllErrors();
        }
        Optional<Member> temp = memberRepository.findByLoginId(member.getLoginId());
        if(temp.isEmpty() && photo != null){
            String pathName = awsS3Service.uploadFile(photo);
            member.setImagePath(pathName);
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

    public List<ItemDTO> getItems(HttpServletRequest request){ //현재 내가 내놓은 물건 내역
        HttpSession session = request.getSession(false);
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
                new ItemDTO(item, awsS3Service.downloadFile(item.getImagePath()),null)));
        return itemDTOs;
    }

    public List<ItemDTO> getReserveItems(HttpServletRequest request){ // 현재 내가 찜한 물건 내역
        HttpSession session = request.getSession(false);
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
                new ItemDTO(item, awsS3Service.downloadFile(item.getImagePath()),null)));
        return itemDTOs;
    }

    public List<ItemDTO> getSellingItems(HttpServletRequest request){ //현재 내가 판매하는 물건중 거래예약된 내역
        HttpSession session = request.getSession(false);
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
        return items.stream().filter(item -> item.getConfirmedMember() != null).map(item -> new ItemDTO(item,awsS3Service.downloadFile(item.getImagePath()),item.getConfirmedMember().getFasion())).collect(Collectors.toList());
    }

    public List<ItemDTO> getBuyingItems(HttpServletRequest request){ //현재 내가 찜한 물건중 거래예약된 물건 내역
        HttpSession session = request.getSession(false);
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

        return items.stream().map(item -> new ItemDTO(item, awsS3Service.downloadFile(item.getImagePath()),item.getOwner().getFasion())).collect(Collectors.toList());
    }

    public List<ItemSoldBoughtDTO> getMySoldouts(Long memberId, HttpServletRequest request){ //내 판매 내역
        List<ItemSoldBoughtDTO> soldouts = new ArrayList<>();
        HttpSession session = request.getSession(false);
        if(session == null)
            return soldouts;

        Member loggedMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return soldouts;
        }

        Member soldMember = (Member) memberRepository.findById(memberId).get();

        if(soldMember == null){
            return soldouts;
        }
        soldMember.getSoldoutItems().stream().forEach(item->soldouts.add(new ItemSoldBoughtDTO(item,awsS3Service.downloadFile(item.getImagePath()))));
        return soldouts;
    }
    public List<ItemSoldBoughtDTO> getMyBoughts(Long memberId, HttpServletRequest request){ //내 구매 내역
        List<ItemSoldBoughtDTO> boughts = new ArrayList<>();
        HttpSession session = request.getSession(false);
        if(session == null)
            return boughts;
        Member loggedMember = (Member)session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return boughts;
        }
        Member boughtMember = (Member) memberRepository.findById(memberId).get();
        if(boughtMember == null){
            return boughts;
        }
        boughtMember.getBoughtItems().stream().forEach(item->boughts.add(new ItemSoldBoughtDTO(item,awsS3Service.downloadFile(item.getImagePath()))));
        return boughts;
    }

    public void decribeFasion(String fasion,HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session == null)
            return;

        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null){
            return;
        }

        Member realMember = memberRepository.findById(loggedMember.getMemberId()).get();
        if(realMember == null){
            return;
        }

        realMember.setFasion(fasion);
        memberRepository.save(realMember);
    }

    public MemberDTO myProfile(HttpServletRequest request){
        Member member = (Member) request.getSession(false).getAttribute(SessionConst.LOGIN_MEMBER);
        if(member == null)
            return null;
        HttpSession session = request.getSession(false);
        if(session == null)
            return null;

        Member loggedMember = memberRepository.findById(member.getMemberId()).get();
        if(loggedMember == null){
            return null;
        }

        byte[] photo = null;
        if(loggedMember.getImagePath() != null){
            photo = awsS3Service.downloadFile(loggedMember.getImagePath());
        }
        return new MemberDTO(loggedMember,photo);
    }

    public MemberDTO memberProfile(Long memberId, HttpServletRequest request){


        Member member = memberRepository.findById(memberId).get();
        if(member == null){
            return null;
        }
        byte[] photo = null;
        if(member.getImagePath() != null){
            photo = awsS3Service.downloadFile(member.getImagePath());
        }
        return new MemberDTO(member,photo);
    }

    public void marketEntered(Long marketId,HttpServletRequest request){
        if(request == null)
            return;
        HttpSession session = request.getSession(false);
        if(session == null)
            return;
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null)
            return;
        Long memberId = loggedMember.getMemberId();
        if(memberId == null)
            return;

        MarketEnter marketEnter = new MarketEnter();
        marketEnter.setMarketId(marketId);
        marketEnter.setMemberId(memberId);
        marketEnterRepository.save(marketEnter);
    }

    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}