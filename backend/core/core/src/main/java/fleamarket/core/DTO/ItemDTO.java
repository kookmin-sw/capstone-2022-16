package fleamarket.core.DTO;

import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
import fleamarket.core.service.AwsS3Service;
import lombok.Getter;
import lombok.Setter;

import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;
import org.yaml.snakeyaml.error.Mark;

import javax.persistence.Tuple;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
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
    private List<MemberDTO> reserveMembers;
    private boolean soldOut;
    private boolean bought;
    private int sellingTime;
    private Long marketId;
    private MemberDTO reserveConfirmationMember;
    private byte[] file;
    private String fasionDescription;
    private Long Owner;

    public ItemDTO(Item item,byte[] file,String fasionDescription){

        this.name = item.getOwner().getName();
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.price = item.getPrice();
        this.description = item.getDescription();
        this.reserveMembers = item.getReserveMembers().stream().map(relation -> new MemberDTO(relation.getReserveMember(),null)).collect(Collectors.toList());
        this.soldOut = item.isSoldOut();
        this.sellingTime = item.getSellingTime();
        if(item.getMarket() != null){
            this.marketId = item.getMarket().getMarketId();
        }
        if(item.getOwner() != null){
            this.Owner = item.getOwner().getMemberId();
        }
        this.bought = item.isBought();
        if(item.getConfirmedMember() != null) {
            this.reserveConfirmationMember = new MemberDTO(item.getConfirmedMember(),null);
        }
        else{
            this.reserveConfirmationMember = new MemberDTO(new Member(),null);
        }
        if(file != null) {
            this.file = file;
        }
        if(fasionDescription != null){
            this.fasionDescription = fasionDescription;
        }
    }
}
