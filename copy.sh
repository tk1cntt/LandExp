#yarn run webpack:build
rsync -e "ssh -i ~/Downloads/ServerKey.pem" --rsync-path="sudo rsync" -avz target/www/ ec2-user@54.179.162.103:/var/www/taikhoan.tinvang.com.vn/
