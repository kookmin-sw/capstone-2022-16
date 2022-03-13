package fleamarket.core;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class errorJson {
    private final int num;
    private final String msg;
}
