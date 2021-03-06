package fleamarket.core.repository;

import fleamarket.core.domain.ITEM_MEMBER_RESERVE_RELATION;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import java.util.Optional;

@Slf4j
@Transactional
@Repository
public class ITEM_MEMBER_RESERVERELATION_Repository {
    @PersistenceContext
    private EntityManager em;

    public ITEM_MEMBER_RESERVE_RELATION save(ITEM_MEMBER_RESERVE_RELATION relation){
        em.persist(relation);
        return relation;
    }

    public void delete(ITEM_MEMBER_RESERVE_RELATION relation){
        em.remove(relation);
    }

    public Optional<ITEM_MEMBER_RESERVE_RELATION> findById(Long id){
        return Optional.ofNullable(em.find(ITEM_MEMBER_RESERVE_RELATION.class,id));
    }

    public void deleteById(Long id){
        ITEM_MEMBER_RESERVE_RELATION relation = findById(id).get();
        em.remove(relation);
    }
}
