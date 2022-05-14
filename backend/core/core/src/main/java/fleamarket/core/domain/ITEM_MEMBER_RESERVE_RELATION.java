package fleamarket.core.domain;


import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Entity
public class ITEM_MEMBER_RESERVE_RELATION {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="RESERVED_ITEM")
    private Item reserveItems;

    @ManyToOne
    @JoinColumn(name="RESERVED_MEMBER")
    private Member reserveMember ;
}
