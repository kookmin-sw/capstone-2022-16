package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
public class Market {

    @Id @GeneratedValue
    @Column(name = "MARKET_ID")
    private Long marketId;

    @OneToMany(mappedBy = "market")
    private List<Item> items = new ArrayList<>();

    private double latitude;
    private double longitude;
    //public Market(String[] itemsInfo){
        //items = itemsInfo;
    //}
}
