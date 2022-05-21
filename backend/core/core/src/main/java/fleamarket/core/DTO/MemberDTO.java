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
    private Long reportedCount;
    public MemberDTO(Member member,byte[] photo){
        this.memberId = member.getMemberId();
        this.name = member.getName();
        this.fasion = member.getFasion();
        this.reportedCount = member.getReportedCount();
        if(member.getImagePath() != null){
            this.photo = photo;
        }
    }
}