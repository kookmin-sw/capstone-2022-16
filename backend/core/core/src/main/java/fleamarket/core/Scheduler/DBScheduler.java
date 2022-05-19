package fleamarket.core.Scheduler;

import fleamarket.core.repository.ItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DBScheduler {
    private final ItemRepository itemRepository;

    @Scheduled(cron = "0 0 0 * * 1") //월요일이 시작되자마자 ITEM DB 정리.
    public void noOwnerItemDelete(){
        itemRepository.deleteSoldoutItem();
    }
}
