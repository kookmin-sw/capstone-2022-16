package fleamarket.core.DTO;

import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
import lombok.Getter;
import lombok.Setter;
import org.yaml.snakeyaml.error.Mark;

import java.util.List;
import java.util.stream.Collectors;

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
    private int sellingTime;
    private Market market;

    public ItemDTO(Item item){
        this.name = item.getMember().getName();
        this.name = item.getMember().getName();
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.price = item.getPrice();
        this.description = item.getDescription();
        this.reserveMembers = item.getMembers().stream().map(relation -> relation.getMembers().getName()).collect(Collectors.toList());
        this.soldOut = item.isSoldOut();
        this.sellingTime = item.getSellingTime();
        this.market = item.getMarket();
    }
}
