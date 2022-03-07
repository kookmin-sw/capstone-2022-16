package fleamarket.core.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class Location {
    private final double latitude;
    private final double longitude;
}
