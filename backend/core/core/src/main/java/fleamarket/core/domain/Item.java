package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class Item {

    @Id @GeneratedValue
    @Column(name="ITEM_ID")
    private Long itemId;
    private String itemName;
    private Long price;
    private boolean reserved = false;
    private boolean soldOut = false;

    @ManyToOne
    @JoinColumn(name="MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name="MARKET_ID")
    private Market market;

}
