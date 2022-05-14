package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ItemSoldout {

    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name="SoldMember")
    private Member SoldMember;

    private String itemName;
    private Long itemPrice;
    private String imagePath;
}
