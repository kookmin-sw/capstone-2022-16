package fleamarket.core.repository;

import fleamarket.core.domain.ItemSoldout;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Repository
@Transactional
@Slf4j
public class SoldoutRepository {
    @PersistenceContext
    EntityManager em;

    public void save(ItemSoldout soldout){
        em.persist(soldout);
    }

    public void delete(ItemSoldout soldout){
        em.remove(soldout);
    }


}
