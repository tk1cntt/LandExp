package com.landexp.service;

import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.PathWrapper;
import com.graphhopper.reader.osm.GraphHopperOSM;
import com.graphhopper.routing.util.EncodingManager;
import com.graphhopper.util.PointList;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

public class MapRoutingTest {
    GraphHopper graphHopper;
    final static String testOsm = "map/vietnam-latest.osm.pbf";
    private static final String ghLoc = "map/tmp";

    public static void main(String[] args) {
        Path osmFile = Paths.get("src", "main", "resources", "vietnam-latest.osm.pbf");
        // create one GraphHopper instance
        GraphHopper hopper = new GraphHopperOSM().forServer();
        hopper.setDataReaderFile(osmFile.toFile().getAbsolutePath());
        // where to store graph hopper files?
        // hopper.setGraphHopperLocation(graphFolder);
        hopper.setEncodingManager(new EncodingManager("car"));

        // now this can take minutes if it imports or a few seconds for loading
        // of course this is dependent on the area you import
        hopper.importOrLoad();

        // simple configuration of the request object, see the GraphHopperServlet class for more possibilities.
        GHRequest req = new GHRequest(21.013268, 105.812856, 21.023323, 105.820055).
            setWeighting("fastest").
            setVehicle("car").
            setLocale(Locale.US);
        GHResponse rsp = hopper.route(req);

        // first check for errors
        if (rsp.hasErrors()) {
            // handle them!
            // rsp.getErrors()
            return;
        }

        // use the best path, see the GHResponse class for more possibilities.
        PathWrapper path = rsp.getBest();

        // points, distance in meters and time in millis of the full path
        PointList pointList = path.getPoints();
        double distance = path.getDistance();
        long timeInMs = path.getTime();
        System.out.println("distancce = " + distance);
        long endTime = (System.currentTimeMillis());
        System.out.println("time = " + timeInMs);
    }
}
