package com.landexp.service;

import com.google.maps.GeoApiContext;
import com.graphhopper.GHRequest;
import com.graphhopper.GHResponse;
import com.graphhopper.GraphHopper;
import com.graphhopper.PathWrapper;
import com.graphhopper.reader.osm.GraphHopperOSM;
import com.graphhopper.routing.util.EncodingManager;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Locale;

@Service
@Transactional
public class GraphHopperService {
    private GraphHopper hopper;

    public GraphHopperService() {
        Path osmFile = Paths.get("src", "main", "resources", "vietnam-latest.osm.pbf");
        // create one GraphHopper instance
        hopper = new GraphHopperOSM().forServer();
        hopper.setDataReaderFile(osmFile.toFile().getAbsolutePath());
        // where to store graph hopper files?
        hopper.setGraphHopperLocation("graph-hopper-map");
        hopper.setEncodingManager(new EncodingManager("car"));
        // now this can take minutes if it imports or a few seconds for loading
        // of course this is dependent on the area you import
        hopper.importOrLoad();
    }

    public PathWrapper route(double fromLat, double fromLon, double toLat, double toLon) {
        // simple configuration of the request object, see the GraphHopperServlet class for more possibilities.
        GHRequest req = new GHRequest(21.040291, 105.850929, 21.035474, 105.854866).
            setWeighting("fastest").
            setVehicle("car").
            setLocale(Locale.US);
        GHResponse rsp = hopper.route(req);
        // first check for errors
        if (rsp.hasErrors()) {
            // handle them!
            // rsp.getErrors()
            return null;
        }
        // use the best path, see the GHResponse class for more possibilities.
        return rsp.getBest();
    }
}
