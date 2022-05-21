package fleamarket.core.controller;

import fleamarket.core.Const.SessionConst;
import fleamarket.core.domain.Member;
import fleamarket.core.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RestController
@RequiredArgsConstructor
public class ReportController {
    private final ReportService reportService;
    @PostMapping("/report/ConfirmMember")
    public void ReportConfirm(@RequestParam Long reportedMemberId, @RequestParam Long itemId, HttpServletRequest request){
        reportService.reportConfirmMember(reportedMemberId,itemId,request);
    }

    @PostMapping("/report/SellMember")
    public void ReportSell(@RequestParam Long reportedMemberId, @RequestParam Long itemId, HttpServletRequest request){
        reportService.reportSellMember(reportedMemberId,itemId,request);
    }
}
