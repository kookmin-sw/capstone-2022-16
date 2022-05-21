package fleamarket.core.repository;

import fleamarket.core.domain.Member;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Transactional
public interface MemberRepository {
    Member save(Member member);
    Optional<Member> findById(Long id);
    //Optional<Member> findByName(String name);
    List<Member> findAll();
    Optional<Member> findByLoginId(String loginId);

    void reportHandle();
}
