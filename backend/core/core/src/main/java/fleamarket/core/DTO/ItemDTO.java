package fleamarket.core.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDTO {
    private Long itemId;
    private String itemName;
    private Long price;
    private boolean reserved;
    private boolean soldOut;

    public ItemDTO(Long itemId,String itemName,Long price,boolean is_reserved,boolean soldOut){
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.reserved = reserved;
        this.soldOut = soldOut;
    }
}
