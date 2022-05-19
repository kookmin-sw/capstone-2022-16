package fleamarket.core.DTO;

import fleamarket.core.domain.ItemBought;
import fleamarket.core.domain.ItemSoldout;
import fleamarket.core.domain.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Setter
public class ItemSoldBoughtDTO {

    private Long SoldMember;
    private String itemName;
    private Long itemPrice;
    private byte[] image;

    public ItemSoldBoughtDTO(ItemSoldout itemSoldout,byte[] image){
        this.SoldMember = itemSoldout.getSoldMember().getMemberId();
        this.itemName = itemSoldout.getItemName();
        this.itemPrice = itemSoldout.getItemPrice();
        this.image = image;
    }

    public ItemSoldBoughtDTO(ItemBought itemBought,byte[] image){
        this.SoldMember = itemBought.getBoughtMember().getMemberId();
        this.itemName = itemBought.getItemName();
        this.itemPrice = itemBought.getItemPrice();
        this.image = image;
    }
}
