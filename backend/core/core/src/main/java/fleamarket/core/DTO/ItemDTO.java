package fleamarket.core.DTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ItemDTO {
    private String name;
    private Long itemId;
    private String itemName;
    private Long price;
    private String description;
    private boolean reserved;
    private boolean soldOut;

    public ItemDTO(String name, Long itemId,String itemName,String description, Long price,boolean is_reserved,boolean soldOut){
        this.name = name;
        this.itemId = itemId;
        this.itemName = itemName;
        this.price = price;
        this.description = description;
        this.reserved = is_reserved;
        this.soldOut = soldOut;
    }
}
