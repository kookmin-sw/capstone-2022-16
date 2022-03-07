package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Market {
    private String[] items;

    public Market(String[] itemsInfo){
        items = itemsInfo;
    }
}
