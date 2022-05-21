package fleamarket.core.repository;

import fleamarket.core.domain.MarketEnter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
@Slf4j
public class MarketEnterRepository {
    @PersistenceContext
    EntityManager em;

    public void save(MarketEnter marketEnter){
        em.persist(marketEnter);
    }

    public void delete(MarketEnter marketEnter){
        em.remove(marketEnter);
    }

    public boolean isMemberEntered(Long marketId,Long memberId){
        String query = String.format("select m from MarketEnter m where MARKET_ID = %s and MEMBER_ID = %s",marketId,memberId);
        List<MarketEnter> enters = em.createQuery(query,MarketEnter.class).getResultList();
        if(enters.isEmpty())
            return false;
        return true;
    }

    public List<MarketEnter> getAll(){
        return em.createQuery("select m from MarketEnter m",MarketEnter.class).getResultList();
    }

    public void deleteAll(){
        List<MarketEnter> enters = getAll();
        enters.stream().forEach(marketEnter -> em.remove(marketEnter));
    }
}
