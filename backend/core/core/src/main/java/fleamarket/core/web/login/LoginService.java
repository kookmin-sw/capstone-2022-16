package fleamarket.core.web.login;

import fleamarket.core.domain.Member;
import fleamarket.core.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {
    private final MemberRepository memberRepository;


    public Member login(String loginId, String password){
        return memberRepository.findById(loginId)
                .filter(m-> m.getPassword().equals(password))
                .orElse(null);
    }


}
