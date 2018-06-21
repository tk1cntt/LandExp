/*global google*/
import * as React from 'react';
import {} from '@types/googlemaps';
import {} from '@types/markerclustererplus';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const MyMapComponent: React.StatelessComponent<{
    isMarkerShown: boolean,
    onMarkerClick: any
}> = compose(
    withProps({
        googleMapURL: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCYcnnPJ3J-v8nbiyGbp4APnQANcmQeIwc&v=3.exp&libraries=geometry,drawing,places',
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />
      }),
      withScriptjs,
      withGoogleMap
)((props: any) => {
    return (
        <GoogleMap
            defaultZoom={4}
            defaultCenter={{ lat: 21.0286669, lng: 105.8521484 }}
        >
            {props.isMarkerShown && <Marker position={{ lat: 21.0286669, lng: 105.8521484 }} onClick={props.onMarkerClick} />}
        </GoogleMap>
    );
}) as any;

export default class MyFancyComponent extends React.PureComponent {
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
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  }

  render() {
    return (
      <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}
