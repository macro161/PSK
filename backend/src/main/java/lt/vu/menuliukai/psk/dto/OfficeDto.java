package lt.vu.menuliukai.psk.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class OfficeDto {
    long id;

    String city;

    String address;

    List<Long> apartmentRooms;
}