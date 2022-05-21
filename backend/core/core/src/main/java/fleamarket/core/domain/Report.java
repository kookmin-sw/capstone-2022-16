package fleamarket.core.domain;

import lombok.Getter;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Report {
    @Id
    @GeneratedValue
    private Long id;

    private Long reportMember;

    private Long reportedMember;

    private Long marketId;
}
