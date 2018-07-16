package com.landexp.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.AmazonS3Exception;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.transfer.TransferManager;
import com.amazonaws.services.s3.transfer.Upload;
import com.amazonaws.services.s3.transfer.model.UploadResult;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

@Service
public class S3Service {

    private Logger logger = LoggerFactory.getLogger(S3Service.class);

    private String bucket = "images.tinvang.com.vn";

    // private AmazonS3 amazonS3 = AmazonS3ClientBuilder.defaultClient();
    private AmazonS3 amazonS3 = new AmazonS3Client();

    private void upload(InputStream inputStream, String s3path) throws AmazonS3Exception {
        TransferManager transferManager = new TransferManager(amazonS3);
        PutObjectRequest putObjectRequest = new PutObjectRequest(bucket, s3path, inputStream, new ObjectMetadata());
        Upload upload = transferManager.upload(putObjectRequest);
        try {
            UploadResult result = upload.waitForUploadResult();
            amazonS3.setObjectAcl(bucket, result.getKey(), CannedAccessControlList.PublicRead);
        } catch (Exception e) {
            throw new AmazonS3Exception("Store file to s3 failed", e);
        }
    }

    public void save(String s3path, byte[] data) throws AmazonS3Exception {
        try {
            ByteArrayInputStream bais = new ByteArrayInputStream(data);
            upload(bais, s3path);
        } catch (Exception e) {
            throw new AmazonS3Exception("Store file to s3 failed", e);
        }
    }
}
