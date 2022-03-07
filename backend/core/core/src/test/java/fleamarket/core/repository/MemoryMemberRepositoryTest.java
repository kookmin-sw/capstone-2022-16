package fleamarket.core.repository;

import fleamarket.core.domain.Member;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

import java.util.List;

class MemoryMemberRepositoryTest {
    MemoryMemberRepository repository = new MemoryMemberRepository();

    @AfterEach
    public void afterEach(){
        repository.deleteAll();
    }
    @Test
    public void save(){
        Member member = new Member();
        member.setName("chanwoo");
        member.setPassword("123");
        repository.save(member);
        Member findMem = repository.findById(member.getId()).get();
        //Assertions.assertEquals(member,findMem);
        Assertions.assertThat(member).isEqualTo(findMem);
    }

    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("chanwoo");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Kwan");
        repository.save(member2);

        Member find1 = repository.findByName("chanwoo").get();
        Member find2 = repository.findByName("Kwan").get();
        Assertions.assertThat(member1).isEqualTo(find1);
        Assertions.assertThat(member1).isNotEqualTo(find2);
    }

    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setName("chanwoo");
        repository.save(member1);

        Member member2 = new Member();
        member2.setName("Kwan");
        repository.save(member2);

        List<Member> members = repository.findAll();
        Assertions.assertThat(members.size()).isEqualTo(2);
    }
}
