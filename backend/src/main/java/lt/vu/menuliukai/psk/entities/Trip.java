package lt.vu.menuliukai.psk.entities;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lt.vu.menuliukai.psk.converters.*;

import java.util.Date;
import java.util.List;

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

    @ManyToMany(fetch = FetchType.LAZY, cascade = { CascadeType.PERSIST, CascadeType.MERGE }, mappedBy = "trips")
    @JsonSerialize(converter = IdListConverter.class)
    @JsonDeserialize(converter = IdListToEmployeeListConverter.class)
    List<Employee> employees;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "from_office_id", nullable = false)
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = OfficeConverter.class)
    @JsonProperty("from_office")
    Office fromOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "to_office_id", nullable = false)
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = OfficeConverter.class)
    @JsonProperty("to_office")
    Office toOffice;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "apartment_room_id", nullable = false)
    @JsonSerialize(converter = IdObjectToLongConverter.class)
    @JsonDeserialize(converter = OfficeConverter.class)
    ApartmentRoom apartmentRoom;

    @OneToMany(mappedBy = "trip")
    @JsonIgnore
    List<TripChecklist> checklistLists;
}