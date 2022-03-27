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
    private double latitude;
    private double longitude;
    private List<ItemDTO> itemDTOs = new ArrayList<>();
    public MarketDTO(Long marketId,double latitude,double longitude,List<Item> items){
        this.marketId = marketId;
        this.latitude = latitude;
        this.longitude = longitude;
        items.stream().forEach(item -> itemDTOs.add(new ItemDTO(item.getMember().getName(),item.getItemId(),item.getItemName(),item.getPrice(),item.isReserved(),item.isSoldOut())));
    }
}
