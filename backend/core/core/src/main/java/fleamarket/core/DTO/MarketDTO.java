package fleamarket.core.DTO;

import fleamarket.core.domain.Item;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class MarketDTO {
    private Long marketId;
    private List<ItemDTO> itemDTOs = new ArrayList<>();
    public MarketDTO(Long marketId, List<Item> items){
        this.marketId = marketId;
        items.stream().forEach(item -> itemDTOs.add(new ItemDTO(item.getItemId(),item.getItemName(),item.getPrice())));
    }
}
