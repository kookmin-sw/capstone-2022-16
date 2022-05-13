package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Member {

    @Id @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long memberId;

    @OneToMany(mappedBy = "member")
    protected List<Item> items = new ArrayList<>();

    @OneToMany(mappedBy ="members")
    private List<ITEM_MEMBER_RESERVE_RELATION> reserveItems;

    @OneToMany(mappedBy ="member")
    private List<ItemBought> boughtItems;

    @OneToMany(mappedBy ="member")
    private List<ItemSoldout> soldoutItems;

    @NotEmpty
    private String loginId; //로그인 ID
    @NotEmpty
    private String name; //사용자 이름
    @NotEmpty
    private String password;
}
