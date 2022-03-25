package fleamarket.core.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDTO {
    private Long itemId;
    private String itemName;
    private Long price;

    public ItemDTO(Long itemId,String itemName,Long price){
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
    }
}
