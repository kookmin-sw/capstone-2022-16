package fleamarket.core.DTO;

import fleamarket.core.domain.Member;

public class MemberDTO {
    private Long memberId;
    private String name; //사용자 이름

    public MemberDTO(Member member){
        this.memberId = member.getMemberId();
        this.name = member.getName();
    }
}
