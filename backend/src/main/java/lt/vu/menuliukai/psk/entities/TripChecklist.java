package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

    boolean plainTickets;

    boolean car;

    @OneToOne
    Trip trip;
}