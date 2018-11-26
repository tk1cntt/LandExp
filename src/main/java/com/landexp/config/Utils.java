package com.landexp.config;

import org.hashids.Hashids;

import java.io.ByteArrayOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class Utils {
    public static String encodePayment(Long id) {
        Hashids hashids = new Hashids("payment.landexp.com.vn");
        return hashids.encode(id, 20190101);
    }

    public static long decodePayment(String code, String salt) {
        Hashids hashids = new Hashids("payment.landexp.com.vn");
        return hashids.decode(code)[0];
    }

    public static String encodeId(Long id) {
        Hashids hashids = new Hashids("id.landexp.com.vn");
        return hashids.encode(id, 20190101);
    }

    public static long decodeId(String code) {
        Hashids hashids = new Hashids("id.landexp.com.vn");
        return hashids.decode(code)[0];
    }

    public static byte[] getImageDefault(String fileName) {
        try {
            Path source = Paths.get(fileName);
            ByteArrayOutputStream bao = new ByteArrayOutputStream();
            Files.copy(source, bao);
            return bao.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
