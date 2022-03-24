package fleamarket.core.repository;

import fleamarket.core.domain.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Slf4j
@Repository
public class ItemRepository {

    @PersistenceContext
    private EntityManager em;

    public Item save(Item item){
        em.persist(item);
        return item;
    }

    public void delete(Item item){
        em.remove(item);
    }


}