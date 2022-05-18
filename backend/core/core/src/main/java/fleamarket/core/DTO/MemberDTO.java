package fleamarket.core.DTO;

import fleamarket.core.domain.Member;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDTO {
    private Long memberId;
    private String name; //사용자 이름
    private String fasion;
    private byte[] photo;
    public MemberDTO(Member member,byte[] photo){
        this.memberId = member.getMemberId();
        this.name = member.getName();
        this.fasion = member.getFasion();
        if(member.getImagePath() != null){
            this.photo = photo;
        }
    }
}