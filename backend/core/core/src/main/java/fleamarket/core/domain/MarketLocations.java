package fleamarket.core.domain;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class MarketLocations {
    private Location[] locations;

    MarketLocations(Location[] locations1){
        locations = locations1;
    }
}
