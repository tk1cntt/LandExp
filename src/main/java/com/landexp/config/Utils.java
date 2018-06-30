package com.landexp.config;

import org.hashids.Hashids;

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
}
