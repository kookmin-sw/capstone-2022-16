package fleamarket.core.DTO;

import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import fleamarket.core.domain.Member;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ItemDTO {
    private String name;
    private Long itemId;
    private String itemName;
    private Long price;
    private String description;
    private List<String> reserveMembers;
    private boolean soldOut;

    public ItemDTO(String name, Long itemId, String itemName, String description, Long price, List<String> reserveMember, boolean soldOut){
        this.name = name;
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.description = description;
        this.reserveMembers = reserveMember;
        this.soldOut = soldOut;
    }
}
