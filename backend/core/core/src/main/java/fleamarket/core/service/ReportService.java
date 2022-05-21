package fleamarket.core.service;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.domain.Item;
import fleamarket.core.domain.Member;
import fleamarket.core.domain.Report;
import fleamarket.core.repository.ItemRepository;
import fleamarket.core.repository.MarketEnterRepository;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.ReportRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ReportService {
    private final ReportRepository reportRepository;
    private final ItemRepository itemRepository;
    private final MarketEnterRepository marketEnterRepository;
    private final MemberRepository memberRepository;

    public void reportConfirmMember(Long memberId, Long itemId, HttpServletRequest request){
        if(request == null)
            return;
        HttpSession session = request.getSession(false);
        if(session == null)
            return;
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null)
            return;
        if(loggedMember.getMemberId() == null)
            return;
        Item item = itemRepository.findById(itemId).get();
        if(item == null)
            return;
        if(item.getOwner() == null)
            return;
        if(item.getOwner().getMemberId() == null)
            return;
        if(item.getOwner().getMemberId() != loggedMember.getMemberId()){
            return;
        }
        if(item.getMarket() == null)
            return;
        if(item.getConfirmedMember() == null)
            return;
        if(memberId != item.getConfirmedMember().getMemberId())
            return;

        Report report = new Report();
        report.setReportedMember(memberId);
        report.setReportMember(loggedMember.getMemberId());
        report.setMarketId(item.getMarket().getMarketId());
        if(reportRepository.is_alreadyReported(report))
            return;
        reportRepository.save(report);
    }

    public void reportSellMember(Long memberId, Long itemId, HttpServletRequest request){
        if(request == null)
            return;
        HttpSession session = request.getSession(false);
        if(session == null)
            return;
        Member loggedMember = (Member) session.getAttribute(SessionConst.LOGIN_MEMBER);
        if(loggedMember == null)
            return;
        if(loggedMember.getMemberId() == null)
            return;
        Item item = itemRepository.findById(itemId).get();
        if(item == null)
            return;
        if(item.getOwner() == null)
            return;
        if(item.getOwner().getMemberId() == null)
            return;
        if(item.getOwner().getMemberId() != memberId){
            return;
        }
        if(item.getMarket() == null)
            return;
        if(item.getConfirmedMember() == null)
            return;
        if(loggedMember.getMemberId() != item.getConfirmedMember().getMemberId())
            return;

        Report report = new Report();
        report.setReportedMember(memberId);
        report.setReportMember(loggedMember.getMemberId());
        report.setMarketId(item.getMarket().getMarketId());
        reportRepository.save(report);
    }

    public void validateReport(Report report){
        Long memberId = report.getReportedMember();
        Long marketId = report.getMarketId();
        boolean judge = marketEnterRepository.isMemberEntered(marketId,memberId);
        if(judge){
            return;
        }
        Member reportedMember = memberRepository.findById(memberId).get();
        if(reportedMember == null)
            return;
        Long count = reportedMember.getReportedCount();
        reportedMember.setReportedCount(count+1);
        memberRepository.save(reportedMember);
    }

    public void reportScheduler(){
        List<Report> reports = reportRepository.getAll();
        reports.stream().forEach(report -> validateReport(report));
        reports.stream().forEach(report -> reportRepository.delete(report));
    }
}
