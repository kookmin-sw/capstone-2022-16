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

    @OneToMany(mappedBy = "Owner")
    protected List<Item> myItems = new ArrayList<>();

    @OneToMany(mappedBy = "confirmedMember")
    private List<Item> confirmedItems = new ArrayList<>();

    @OneToMany(mappedBy ="reserveMember")
    private List<ITEM_MEMBER_RESERVE_RELATION> reserveItems;

    @OneToMany(mappedBy ="BoughtMember")
    private List<ItemBought> boughtItems;

    @OneToMany(mappedBy ="SoldMember")
    private List<ItemSoldout> soldoutItems;

    @NotEmpty
    private String loginId; //로그인 ID
    @NotEmpty
    private String name; //사용자 이름
    @NotEmpty
    private String password;

    private String fasion;
}
