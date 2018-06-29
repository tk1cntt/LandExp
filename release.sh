./mvnw clean
./mvnw -Pprod package -DskipTests
cp ./target/landexp* ..
