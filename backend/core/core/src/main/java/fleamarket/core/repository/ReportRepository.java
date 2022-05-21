package fleamarket.core.repository;

import fleamarket.core.domain.Report;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
@Slf4j
public class ReportRepository {
    @PersistenceContext
    EntityManager em;

    public List<Report> getAll(){
        return em.createQuery("select r from Report r",Report.class).getResultList();
    }

    public boolean is_alreadyReported(Report report){
        Long marektId = report.getMarketId();
        Long reportMember = report.getReportMember();
        Long reportedMember = report.getReportedMember();

        String query = String.format("select r from Report r where MARKET_ID is %s and REPORT_MEMBER is %s and REPORTED_MEMBER is %s",marektId,reportMember,reportedMember);
        if(em.createQuery(query,Report.class).getResultList().isEmpty())
            return false;
        return true;
    }

    public void save(Report report){
        em.persist(report);
    }

    public void delete(Report report){
        em.remove(report);
    }

}
