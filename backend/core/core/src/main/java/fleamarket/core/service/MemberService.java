package fleamarket.core.service;

import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemberRepository;
import fleamarket.core.repository.MemoryMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MemberService {
    private final MemoryMemberRepository memberRepository = new
            MemoryMemberRepository();
    @Autowired
    public MemberService(MemoryMemberRepository memberRepository) {
    }

    /**
     * 회원가입
     */
    public Long join(Member member) {
        //validateDuplicateMember(member); //중복 회원 검증
        memberRepository.save(member);
        return member.getMemberId();
    }
    /*
    private void validateDuplicateMember(Member member) {
        memberRepository.findByName(member.getName())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 존재하는 회원입니다.");
                });
    }
     */
    /**
     * 전체 회원 조회
     */
    /*
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

     */
    public Optional<Member> findOne(Long memberId) {
        return memberRepository.findById(memberId);
    }
}