package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ItemBought {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="member")
    private Member member;

    private String itemName;
    private Long itemPrice;
    private String imagePath;
}
