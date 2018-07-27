package com.landexp.service;

import com.graphhopper.PathWrapper;
import com.graphhopper.util.PointList;
import com.landexp.LandexpApp;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = LandexpApp.class)
public class MapRoutingTest {
    @Autowired
    GraphHopperService graphHopperService;

    @Test
    public void testRoute() {
        PathWrapper path = graphHopperService.route(20.912487, 106.149673, 20.905380, 106.147649, "car");
        // points, distance in meters and time in millis of the full path
        PointList pointList = path.getPoints();
        double distance = path.getDistance();
        long timeInMs = path.getTime();
        System.out.println("distance = " + distance);
        System.out.println("time = " + timeInMs);
    }
}
