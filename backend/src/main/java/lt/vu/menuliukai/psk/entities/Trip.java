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
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter @Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="TRIP")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    long id;

    @JsonProperty("leaving_date")
    Date leavingDate;

    @JsonProperty("returning_date")
    Date returningDate;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    Set<EmployeeTrip> employeeTrips = new HashSet<>();

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
}