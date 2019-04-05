package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="CHECKLIST")
public class TripChecklist {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)

    long id;

    // 0 - nereikalingi, 1 - reikalingi, 2 - užsakyti.
    int plainTickets;

    int car;

    int apartments;
}