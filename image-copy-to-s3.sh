#!/bin/bash

readonly HOUSE_ID=$1
#Common setting
readonly LOCAL_STORE_IMAGE_FOLDER=/var/www/images.tinvang.com.vn

# 開発環境
readonly S3_DATA_VAULT_FOLDER=s3://images.tinvang.com.vn

function imageCompressor() {
  echo "Image compressor in $LOCAL_STORE_IMAGE_FOLDER/$HOUSE_ID"
  find $LOCAL_STORE_IMAGE_FOLDER/$HOUSE_ID/ -type f -name "*.jpg" -exec jpegoptim {} \;
  return 0
}

function moveImageDataToS3Folder() {
  echo "Move image from $LOCAL_STORE_IMAGE_FOLDER/$HOUSE_ID to $S3_DATA_VAULT_FOLDER"
  aws s3 mv $LOCAL_STORE_IMAGE_FOLDER/$HOUSE_ID/ $S3_DATA_VAULT_FOLDER/
  return 0
}

function main() {
  imageCompressor
  moveImageDataToS3Folder
}

main
