/*global google*/
import * as React from 'react';
import axios from 'axios';
import {} from '@types/googlemaps';
import {} from '@types/markerclustererplus';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const MyMapComponent: React.StatelessComponent<{
  isMarkerShown: boolean;
  onMarkerClick: any;
}> = compose(
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYcnnPJ3J-v8nbiyGbp4APnQANcmQeIwc&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={16} defaultCenter={{ lat: 21.0286669, lng: 105.8521484 }}>
    {props.isMarkerShown && (
      <Marker
        position={{ lat: 21.0286669, lng: 105.8521484 }}
        draggable
        onDragEnd={e => {
          axios
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=false&key=AIzaSyCYcnnPJ3J-v8nbiyGbp4APnQANcmQeIwc`
            )
            .then(function(response) {
              console.log(response.data.results[0]);
              console.log(response.data.results[0].address_components[response.data.results[0].address_components.length - 1].long_name);
              console.log(response.data.results[0].address_components[response.data.results[0].address_components.length - 2].long_name);
              console.log(response.data.results[0].address_components[response.data.results[0].address_components.length - 3].long_name);
              console.log(response.data.results[0].address_components[response.data.results[0].address_components.length - 4].long_name);
              console.log(response.data.results[0].address_components[response.data.results[0].address_components.length - 5].long_name);
            })
            .catch(function(error) {
              console.log(error);
            });
        }}
      />
    )}
  </GoogleMap>
));

export default class GoogleMaps extends React.PureComponent {
  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.delayedShowMarker();
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return <MyMapComponent isMarkerShown={this.state.isMarkerShown} onMarkerClick={this.handleMarkerClick} />;
  }
}
