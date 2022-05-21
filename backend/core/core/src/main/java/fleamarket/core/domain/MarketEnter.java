package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class MarketEnter {
    @Id
    @GeneratedValue
    private Long id;

    private Long memberId;

    private Long marketId;
}
