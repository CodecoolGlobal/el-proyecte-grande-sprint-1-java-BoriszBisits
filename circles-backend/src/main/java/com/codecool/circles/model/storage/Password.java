package com.codecool.circles.model.storage;

import com.codecool.circles.model.Member;
import lombok.*;

import javax.persistence.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Table(name = "password")
public class Password {
    @Id
    // @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String password;
@OneToOne()
@JoinTable(
        name = "member_password",
        joinColumns = @JoinColumn(name = "member_id"),
        inverseJoinColumns = @JoinColumn(name = "password_id")
)
    private Member member;
}
