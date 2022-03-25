package fleamarket.core.repository;

import fleamarket.core.domain.Market;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
@Transactional
public class MarketRepository {
    @PersistenceContext
    private EntityManager em;

    public Market save(Market market){
        em.persist(market);
        return market;
    }

    public void delete(Market market){
        em.remove(market);
    }

    public Optional<Market> findById(Long id){
        return Optional.ofNullable(em.find(Market.class,id));
    }
    public List<Market> findAll(){
        return em.createQuery("select m from Market m",Market.class).getResultList();
    }

}
