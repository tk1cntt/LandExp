package com.landexp.config;

import org.hashids.Hashids;

public class Utils {
    public static String generatePaymentCode(Long id) {
        Hashids hashids = new Hashids("landexp.com.vn");
        return hashids.encode(id, 20190101);
    }
}
