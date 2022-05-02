package fleamarket.core.web.login;

import fleamarket.core.DTO.ItemDTO;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.MemoryMemberRepository;
import fleamarket.core.web.SessionConst;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final MemberRepository memberRepository;

    /**
     * @return null 로그인 실패
     */
    public Member login(String loginId, String password) {
        return memberRepository.findByLoginId(loginId)
                .filter(m -> m.getPassword().equals(password))
                .orElse(null);
    }

    @Transactional
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
        List<Item> items = realMember.getItems();
        items.stream().forEach(item -> itemDTOs.add(
                new ItemDTO(
                        realMember.getName(),
                        item.getItemId(),
                        item.getItemName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getMembers().stream().map(relation -> relation.getMembers().getName()).collect(Collectors.toList()),
                        item.isSoldOut())));
        return itemDTOs;
    }

    @Transactional
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
        List<Item> items = realMember.getItems();
        items.stream().forEach(item -> itemDTOs.add(
                new ItemDTO(
                        realMember.getName(),
                        item.getItemId(),
                        item.getItemName(),
                        item.getDescription(),
                        item.getPrice(),
                        item.getMembers().stream().map(relation -> relation.getMembers().getName()).collect(Collectors.toList()),
                        item.isSoldOut())));
        return itemDTOs;
    }
}
