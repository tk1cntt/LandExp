package com.landexp.service;

import com.landexp.LandexpApp;
import net.coobird.thumbnailator.Thumbnails;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RunWith(MockitoJUnitRunner.class)
public class ImageCompressionIntTest {

    private BufferedImage createImageFromBytes(byte[] imageData) {
        ByteArrayInputStream bais = new ByteArrayInputStream(imageData);
        try {
            return ImageIO.read(bais);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    public void testImageCompression01() throws IOException {
        Path path = Paths.get("src", "test", "resources", "sample-01.jpg");
        Thumbnails.of(createImageFromBytes(Files.readAllBytes(path)))
            .size(538, 376)
            .outputFormat("jpg")
            //.imageType(BufferedImage.TYPE_INT_RGB)
            .toFile("D:\\8bit");
    }

    @Test
    public void testImageCompression02() throws IOException {
        Path path = Paths.get("src", "test", "resources", "sample-01.jpg");
        String request = new String(Files.readAllBytes(path));
    }

}
