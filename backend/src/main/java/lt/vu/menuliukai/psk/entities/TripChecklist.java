package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.io.Serializable;

@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name="CHECKLIST")
public class TripChecklist implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    long id;

    // 0 - nereikalingi, 1 - reikalingi, 2 - užsakyti.
    int plainTickets;

    int car;

    int apartments;
}