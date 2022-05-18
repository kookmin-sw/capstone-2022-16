package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Getter
@Setter
@Entity
public class Item {

    @Id @GeneratedValue
    @Column(name="ITEM_ID")
    private Long itemId;
    private String itemName;
    private Long price;
    private String description;
    private boolean soldOut = false;
    private boolean bought = false;
    private int sellingTime = 10;
    private String imagePath;

    @ManyToOne
    @JoinColumn(name="Owner_ID")
    private Member Owner;

    @ManyToOne
    @JoinColumn(name="ConfirmedMember_ID")
    private Member confirmedMember;

    @ManyToOne
    @JoinColumn(name="MARKET_ID")
    private Market market;

    @OneToMany(mappedBy ="reserveItems",cascade = CascadeType.REMOVE)
    private List<ITEM_MEMBER_RESERVE_RELATION> reserveMembers;

}
