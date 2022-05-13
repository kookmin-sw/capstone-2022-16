package fleamarket.core.repository;

import fleamarket.core.domain.Item;
import fleamarket.core.domain.ItemBought;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
@Slf4j
public class BoughtRepository {
    @PersistenceContext
    EntityManager em;

    public void save(ItemBought bought){
        em.persist(bought);
    }

    public void delete(ItemBought bought){
        em.remove(bought);
    }

}
