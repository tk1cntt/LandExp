package com.landexp.frontend.responses;

import com.landexp.domain.enumeration.DirectionType;
import com.landexp.domain.enumeration.LandType;
import com.landexp.domain.enumeration.UserActionType;
import com.landexp.service.dto.ArticleDTO;
import com.landexp.service.dto.ArticleDetailDTO;
import com.landexp.service.dto.HouseDTO;
import com.landexp.service.dto.HouseDetailDTO;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;

public class MappingUtils {

    public static void main(String[] args) {
        System.out.println(1600000000f / 1000000000);
        System.out.println(1400000000f / 1000000000);
        System.out.println(formatMoney(1600000000f, UserActionType.FOR_SELL));
        System.out.println(formatMoney(1400000000f, UserActionType.FOR_SELL));
        System.out.println(formatMoney(900000000f, UserActionType.FOR_SELL));
        System.out.println(VNCharacterUtils.removeAccent("Đất dự án"));
    }

    public static String numberFormat(double number) {
        DecimalFormat df = new DecimalFormat("0.0");
        return df.format(number).replaceAll("\\.0$", "");
    }

    public static String formatMoney(Float money, UserActionType actionType) {
        if (ObjectUtils.isEmpty(money)) return "";
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
        if (ObjectUtils.isEmpty(actionType)) return null;
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
        if (ObjectUtils.isEmpty(type)) return null;
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
                return "Đất thổ cư";
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

    public static String formatFullAddress(HouseDetailDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(StringUtils.isEmpty(dto.getAddress()) ? "" : dto.getAddress());
        sb.append(StringUtils.isEmpty(dto.getWardName()) ? "" : ", " + dto.getWardType() + " " + dto.getWardName());
        sb.append(StringUtils.isEmpty(dto.getDistrictName()) ? "" : ", " + dto.getDistrictType() + " " + dto.getDistrictName());
        sb.append(StringUtils.isEmpty(dto.getCityName()) ? "" : ", " + dto.getCityName());
        return sb.toString();
    }

    public static String formatTitle(HouseDetailDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(formatActionType(dto.getActionType()));
        // sb.append(" - ");
        sb.append(" ");
        sb.append(dto.getLandType() == null ? null : formatLandType(dto.getLandType()).toLowerCase());
        // sb.append(" - ");
        sb.append(" giá ");
        sb.append(formatMoney(dto.getMoney(), dto.getActionType())
            .replaceAll("<span>", "")
            .replaceAll("</span>", "")
            .replaceAll("\\/", "-"));
        sb.append(StringUtils.isEmpty(dto.getDistrictName()) ? "" : " - " + dto.getDistrictType() + " " + dto.getDistrictName());
        sb.append(StringUtils.isEmpty(dto.getCityName()) ? "" : ", " + dto.getCityName());
        return sb.toString();
    }

    /**
     * Format 100.0 => 100
     */
    private static String formatNumberRemoveDotZero(Float number) {
        if (ObjectUtils.isEmpty(number)) return null;
        return new java.text.DecimalFormat("#").format(number);
    }

    public static String formatLink(HouseDetailDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(removeAccent(formatActionType(dto.getActionType())));
        sb.append(" ");
        sb.append(removeAccent(formatLandType(dto.getLandType())));
        sb.append(" ");
        sb.append("giá");
        sb.append(" ");
        sb.append(removeAccent(formatMoney(dto.getMoney(), dto.getActionType())
            .replaceAll("<span>", "")
            .replaceAll("</span>", "")));
        sb.append(" ");
        sb.append(removeAccent(dto.getDistrictType()));
        sb.append(" ");
        sb.append(removeAccent(dto.getDistrictName()));
        sb.append(" ");
        sb.append(removeAccent(dto.getCityName()));
        return sb.toString().toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("\\/", "-")
            .replaceAll("'", "")
            .replaceAll("\"", "")
            .replaceAll(",", "");
    }

    public static String formatLink(HouseDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(removeAccent(formatActionType(dto.getActionType())));
        sb.append(" ");
        sb.append(removeAccent(formatLandType(dto.getLandType())));
        sb.append(" ");
        sb.append(" ");
        sb.append("giá");
        sb.append(" ");
        sb.append(removeAccent(formatMoney(dto.getMoney(), dto.getActionType())
            .replaceAll("<span>", "")
            .replaceAll("</span>", "")));
        sb.append(" ");
        sb.append(removeAccent(dto.getDistrictType()));
        sb.append(" ");
        sb.append(removeAccent(dto.getDistrictName()));
        sb.append(" ");
        sb.append(removeAccent(dto.getCityName()));
        return sb.toString().toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("\\/", "-")
            .replaceAll("'", "")
            .replaceAll("\"", "")
            .replaceAll(",", "");
    }

    public static String formatLink(ArticleDetailDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(removeAccent(dto.getCategoryName()));
        sb.append(" ");
        sb.append(removeAccent(dto.getTitle()));
        return sb.toString().toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("\\/", "-")
            .replaceAll("'", "")
            .replaceAll("\"", "")
            .replaceAll(",", "");
    }

    public static String formatLink(ArticleDTO dto) {
        StringBuilder sb = new StringBuilder();
        sb.append(removeAccent(dto.getCategoryName()));
        sb.append(" ");
        sb.append(removeAccent(dto.getTitle()));
        return sb.toString().toLowerCase()
            .replaceAll(" ", "-")
            .replaceAll("\\/", "-")
            .replaceAll("'", "")
            .replaceAll("\"", "")
            .replaceAll(",", "");
    }

    public static BufferedImage createImageFromBytes(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static File folderBy(String root, String... more) {
        File folder = Paths.get(root, more).toFile();
        if (!folder.exists()) {
            folder.mkdirs();
        }
        return folder;
    }

    public static void folderBy(File file) {
        File parentFolder = new File(file.getParent());
        if (parentFolder.exists()) {
            parentFolder.mkdirs();
        }
    }

    public static String formatParking(Boolean parking) {
        if (ObjectUtils.isEmpty(parking)) return "<i class=\"fa fa-times\"></i>";
        if (parking) {
            return "<i class=\"fa fa-check\"></i>";
        } else {
            return "<i class=\"fa fa-times\"></i>";
        }
    }

    public static String removeAccent(String s) {
        if (StringUtils.isEmpty(s)) return null;
        return VNCharacterUtils.removeAccent(s);
    }

    public static String removeHtmlTag(String html) {
        if (StringUtils.isEmpty(html)) return null;
        Document doc = Jsoup.parse(html);
        return doc.body().text();
    }
}
