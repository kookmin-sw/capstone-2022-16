package fleamarket.core.DTO;

import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.service.AwsS3Service;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
public class MarketDTO {
    private Long marketId;
    private double latitude;
    private double longitude;
    private List<ItemDTO> itemDTOs = new ArrayList<>();
    public MarketDTO(Market market){
        this.marketId = market.getMarketId();
        this.latitude = market.getLatitude();
        this.longitude = market.getLongitude();
    }
}
