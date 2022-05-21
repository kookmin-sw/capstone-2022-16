package fleamarket.core.Scheduler;

import fleamarket.core.domain.Report;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MarketEnterRepository;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.ReportRepository;
import fleamarket.core.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class DBScheduler {
    private final ItemRepository itemRepository;
    private final MemberRepository memberRepository;
    private final ReportService reportService;
    private final MarketEnterRepository marketEnterRepository;

    public void noOwnerItemDelete(){
        itemRepository.deleteSoldoutItem();
    }

    public void deleteMarketEnter(){
        marketEnterRepository.deleteAll();
    }

    @Scheduled(cron = "0 0 0 * * 1") //월요일이 시작되자마자 리포트 조회. 그 이후 ITEMDB 정리.
    public void reportHandler(){
        reportService.reportScheduler();
        noOwnerItemDelete();
        deleteMarketEnter();
    }

}
