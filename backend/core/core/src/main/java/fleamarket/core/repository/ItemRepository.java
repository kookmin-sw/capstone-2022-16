package fleamarket.core.repository;

import fleamarket.core.domain.Item;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@Repository
@Transactional
public class ItemRepository {

    @PersistenceContext
    private EntityManager em;

    public Item save(Item item){
        em.persist(item);
        return item;
    }

    public Optional<Item> findById(Long id){
        return Optional.ofNullable(em.find(Item.class,id));
    }

    public void delete(Item item){
        em.remove(item);
    }


}