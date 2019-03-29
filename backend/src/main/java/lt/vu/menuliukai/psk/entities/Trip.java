package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="TRIP")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    Date leavingDate;

    Date returningDate;

    double price;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "trips")
    private Set<Employee> employees = new HashSet<>();


    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_office_id", nullable = false)
    @JsonIgnore
    Office fromOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_office_id", nullable = false)
    @JsonIgnore
    Office toOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "apartment_room_id", nullable = false)
    @JsonIgnore
    ApartmentRoom apartmentRoom;

    @OneToMany(mappedBy = "trip")
    List<TripChecklist> checklistLists;

}