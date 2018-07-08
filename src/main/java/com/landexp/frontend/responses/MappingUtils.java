package com.landexp.frontend.responses;

import com.landexp.config.Utils;
import com.landexp.domain.enumeration.DirectionType;
import com.landexp.domain.enumeration.LandType;
import com.landexp.domain.enumeration.UserActionType;
import com.landexp.service.dto.HouseDTO;
import com.landexp.service.dto.HousePhotoDTO;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import java.text.DecimalFormat;
import java.text.Normalizer;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;

public class MappingUtils {

    public static void main(String[] args) {
        System.out.println(1600000000f/1000000000);
        System.out.println(1400000000f/1000000000);
        System.out.println(formatMoney(1600000000f, UserActionType.FOR_SELL));
        System.out.println(formatMoney(1400000000f, UserActionType.FOR_SELL));
        System.out.println(formatMoney(900000000f, UserActionType.FOR_SELL));
    }

    public static String numberFormat(double number) {
        DecimalFormat df = new DecimalFormat("0.0");
        return df.format(number).replaceAll("\\.0$", "");
    }

    public static String formatMoney(Float money, UserActionType actionType) {
        if (ObjectUtils.isEmpty(money)) return null;
        StringBuilder sb = new StringBuilder();
        sb.append("<span>");
        if (money >= 1000000000) {
            sb.append(numberFormat(money / 1000000000));
            sb.append("</span>");
            sb.append(" tỷ");
        } else if (1000000 <= money && money < 1000000000) {
            sb.append(numberFormat(money / 1000000));
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
        if (ObjectUtils.isEmpty(data)) return null;
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
            return "Bán";
        }
        return "Cho thuê";
    }

    public static String formatDirection(DirectionType type) {
        if (type == null) return null;
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
                return "Chung cư";
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

    private static String formatImageData(byte[] data) {
        return ObjectUtils.isEmpty(data) ? null : new String(Base64.getEncoder().encode(data));
    }

    public static HouseResponse mappingHouseResponse(HouseDTO dto) {
        HouseResponse response = new HouseResponse();
        response.setAvatar(formatImageData(dto.getAvatar()));
        response.setAvatarContentType(dto.getAvatarContentType());
        response.setActionType(formatActionType(dto.getActionType()));
        response.setLandType(formatLandType(dto.getLandType()));
        response.setAddress(dto.getDistrictName() + ", " + dto.getCityName());
        response.setFullAddress(formatFullAddress(dto));
        response.setAcreage(formatNumberRemoveDotZero(dto.getAcreage()));
        response.setMoney(formatMoney(dto.getMoney(), dto.getActionType()));
        response.setAcreageStreetSide(formatNumberRemoveDotZero(dto.getAcreageStreetSide()));
        response.setBathRoom(dto.getBathRoom());
        response.setBedRoom(dto.getBedRoom());
        response.setDirection(formatDirection(dto.getDirection()));
        response.setDirectionBalcony(formatDirection(dto.getDirectionBalcony()));
        response.setFloor(dto.getFloor());
        response.setNumberOfFloor(formatNumberRemoveDotZero(dto.getNumberOfFloor()));
        response.setImage(formatByte(dto.getAvatar()));
        response.setImageContentType(dto.getAvatarContentType());
        response.setUpdateAt(formatDate(dto.getUpdateAt()));
        response.setParking(formatParking(dto.isParking()));
        response.setSummary(dto.getSummary());
        response.setLink(formatLink(dto));
        response.setId(Utils.encodeId(dto.getId()));
        response.setCustomer(dto.getCustomer());
        response.setMobile(dto.getMobile());
        response.setEmail(dto.getEmail());
        return response;
    }

    public static HouseImageResponse mappingHouseImageResponse(HousePhotoDTO dto) {
        HouseImageResponse response = new HouseImageResponse();
        response.setImageId(Utils.encodeId(dto.getId()));
        response.setImageData(formatImageData(dto.getImage()));
        response.setImageContentType(dto.getImageContentType());
        return response;
    }

    public static List<HouseImageResponse> mappingHouseImageResponses(List<HousePhotoDTO> images) {
        List<HouseImageResponse> responses = new ArrayList<>();
        for (HousePhotoDTO dto : images) {
            responses.add(mappingHouseImageResponse(dto));
        }
        return responses;
    }

    public static HouseDetailResponse mappingHouseDetailResponse(HouseDTO dto, List<HousePhotoDTO> photos) {
        HouseDetailResponse response = new HouseDetailResponse();
        response.setTitle(formatTitle(dto));
        response.setDescription(dto.getSummary());
        response.setHouse(mappingHouseResponse(dto));
        response.setImages(mappingHouseImageResponses(photos));
        return response;
    }

    private static String formatFullAddress(HouseDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isEmpty(dto.getAddress()) ? "" : dto.getAddress());
        sb.append(StringUtils.isEmpty(dto.getWardName()) ? "" : ", " + dto.getWardName());
        sb.append(StringUtils.isEmpty(dto.getDistrictName()) ? "" : ", " + dto.getDistrictName());
        sb.append(StringUtils.isEmpty(dto.getCityName()) ? "" : ", " + dto.getCityName());
        return sb.toString();
    }

    private static String formatTitle(HouseDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(formatActionType(dto.getActionType()));
        sb.append(" - ");
        sb.append(formatLandType(dto.getLandType()));
        sb.append(" - ");
        sb.append(formatMoney(dto.getMoney(), dto.getActionType())
            .replaceAll("<span>", "")
            .replaceAll("</span>", ""));
        sb.append(StringUtils.isEmpty(dto.getDistrictName()) ? "" : " - " + dto.getDistrictName());
        sb.append(StringUtils.isEmpty(dto.getCityName()) ? "" : " - " + dto.getCityName());
        return sb.toString();
    }

    /**
     * Format 100.0 => 100
     */
    private static String formatNumberRemoveDotZero(Float number) {
        if (ObjectUtils.isEmpty(number)) return null;
        return new java.text.DecimalFormat("#").format(number);
    }

    private static String formatLink(HouseDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(removeAccent(formatActionType(dto.getActionType())));
        sb.append(" ");
        sb.append(removeAccent(formatLandType(dto.getLandType())));
        sb.append(" ");
        sb.append(removeAccent(formatMoney(dto.getMoney(), dto.getActionType())
            .replaceAll("<span>", "")
            .replaceAll("</span>", "")));
        sb.append(" ");
        sb.append(removeAccent(dto.getDistrictName()));
        sb.append(" ");
        sb.append(removeAccent(dto.getCityName()));
        return sb.toString().toLowerCase().replaceAll(" ", "-").replaceAll("\\/", "-");
    }

    public static String formatParking(Boolean parking) {
        if (ObjectUtils.isEmpty(parking)) return null;
        if (parking) {
            return "<i class=\"fa fa-check\"></i>";
        } else {
            return "<i class=\"fa fa-uncheck\"></i>";
        }
    }

    public static String removeAccent(String s) {
        if (StringUtils.isEmpty(s)) return null;
        return VNCharacterUtils.removeAccent(s);
    }
}
