package lt.vu.menuliukai.psk.mybatis.dao;

import java.util.List;
import lt.vu.menuliukai.psk.mybatis.model.Room;

public interface RoomMapper {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PUBLIC.ROOM
     *
     * @mbg.generated Sun Apr 28 13:23:06 EEST 2019
     */
    int deleteByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PUBLIC.ROOM
     *
     * @mbg.generated Sun Apr 28 13:23:06 EEST 2019
     */
    int insert(Room record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PUBLIC.ROOM
     *
     * @mbg.generated Sun Apr 28 13:23:06 EEST 2019
     */
    Room selectByPrimaryKey(Long id);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PUBLIC.ROOM
     *
     * @mbg.generated Sun Apr 28 13:23:06 EEST 2019
     */
    List<Room> selectAll();

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table PUBLIC.ROOM
     *
     * @mbg.generated Sun Apr 28 13:23:06 EEST 2019
     */
    int updateByPrimaryKey(Room record);
}