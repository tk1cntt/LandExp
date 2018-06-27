package com.landexp.frontend.responses;

import com.landexp.domain.enumeration.DirectionType;
import com.landexp.domain.enumeration.LandType;
import com.landexp.domain.enumeration.UserActionType;
import com.landexp.service.dto.HouseDTO;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;

public class MappingUtils {

    public static String formatMoney(Float money, UserActionType actionType) {
        StringBuilder sb = new StringBuilder();
        sb.append("<span>");
        if (money >= 1000000000) {
            sb.append(new java.text.DecimalFormat("#").format(money / 1000000000));
            sb.append("</span>");
            sb.append(" tỷ");
        } else if (1000000 <= money && money < 1000000000) {
            sb.append(new java.text.DecimalFormat("#").format(money / 1000000));
            sb.append("</span>");
            sb.append(" triệu");
        } else {
            sb.append(new java.text.DecimalFormat("#").format(money / 1000));
            sb.append("</span>");
            sb.append(" ngàn");
        }
        if (actionType == UserActionType.FOR_RENT) {
            sb.append("/tháng");
        }
        return sb.toString();
    }

    public static String formatDate(LocalDate data) {
        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
        Date date = Date.from(data.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return formatter.format(date);
    }

    public static String formatByte(byte[] data) {
        if (data == null) return null;
        return new String(Base64.getEncoder().encode(data));
    }

    public static String formatActionType(UserActionType actionType) {
        if (actionType == UserActionType.FOR_SELL) {
            return "BÁN";
        }
        return "CHO THUÊ";
    }

    public static String formatDirection(DirectionType type) {
        if (type == null) return "";
        switch (type) {
            case NORTH:
                return "Bắc";
            case SOUTH:
                return "Nam";
            case EAST:
                return "Đông";
            case WEST:
                return "Tây";
            case EAST_NORTH:
                return "Đông Bắc";
            case WEST_NORTH:
                return "Tây Bắc";
            case EAST_SOUTH:
                return "Đông Nam";
            default:
                return "Tây Nam";
        }
    }

    public static String formatLandType(LandType type) {
        switch (type) {
            case APARTMENT:
                return "Căn hộ chung cư";
            case PEN_HOUSE:
                return "Penhouse";
            case HOME:
                return "Nhà riêng";
            case HOME_VILLA:
                return "Biệt thự";
            case HOME_STREET_SIDE:
                return "Nhà mặt phố";
            case MOTEL_ROOM:
                return "Phòng trọ";
            case OFFICE:
                return "Văn phòng";
            case LAND_SCAPE:
                return "Đất ở";
            case LAND_OF_PROJECT:
                return "Đất dự án";
            case LAND_FARM:
                return "Đất nông nghiệp";
            case LAND_RESORT:
                return "Resort";
            case WAREHOUSES:
                return "Kho, nhà xưởng";
            case KIOSKS:
                return "Cửa hàng, Ki ốt";
            default:
                return "Loại khác";
        }
    }

    public static HouseResponse mappingHouse(HouseDTO dto) {
        HouseResponse response = new HouseResponse();
        response.setActionType(formatActionType(dto.getActionType()));
        response.setLandType(formatLandType(dto.getLandType()));
        response.setAcreage(dto.getAcreage());
        response.setMoney(formatMoney(dto.getMoney(), dto.getActionType()));
        response.setAcreageStreetSide(dto.getAcreageStreetSide());
        response.setBathRoom(dto.getBathRoom());
        response.setBedRoom(dto.getBedRoom());
        response.setDirection(formatDirection(dto.getDirection()));
        response.setDirectionBalcony(formatDirection(dto.getDirectionBalcony()));
        response.setFloor(dto.getFloor());
        response.setNumberOfFloor(dto.getNumberOfFloor());
        response.setImage(formatByte(dto.getAvatar()));
        response.setImageContentType(dto.getAvatarContentType());
        response.setUpdateAt(formatDate(dto.getUpdateAt()));
        return response;
    }
}
