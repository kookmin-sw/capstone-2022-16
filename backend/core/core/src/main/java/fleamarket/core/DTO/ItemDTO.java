package fleamarket.core.DTO;

import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Market;
import fleamarket.core.domain.Member;
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
    private int sellingTime;
    private Long marketId;
    private MemberDTO reserveConfirmationMember;
    private byte[] file;

    public ItemDTO(Item item){

        this.name = item.getOwner().getName();
        this.itemId = item.getItemId();
        this.itemName = item.getItemName();
        this.price = item.getPrice();
        this.description = item.getDescription();
        this.reserveMembers = item.getReserveMembers().stream().map(relation -> new MemberDTO(relation.getReserveMember())).collect(Collectors.toList());
        this.soldOut = item.isSoldOut();
        this.sellingTime = item.getSellingTime();
        this.marketId = item.getMarket().getMarketId();

        if(item.getConfirmedMember() != null) {
            this.reserveConfirmationMember = new MemberDTO(item.getConfirmedMember());
        }
        try {
            InputStream in = getClass().getResourceAsStream("/static/a.png");
            if(in != null)
                this.file = in.readAllBytes();
        }
        catch(IOException e){
            int a= 1;
        }
    }
}
