/*global google*/
/* tslint:disable */
/// <reference types="google-maps" />
/// <reference types="markerclustererplus" />
import React from 'react';
import { connect } from 'react-redux';
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';
import { compose, withProps } from 'recompose';

const MyMapComponent: React.StatelessComponent<{
  isMarkerShown: boolean;
  onMarkerClick: any;
  updateMarkerPosition: any;
  currentPosition: any;
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
)(props => {
  const position = {
    lat: props.currentPosition.latitude ? props.currentPosition.latitude : 21.0286669,
    lng: props.currentPosition.longitude ? props.currentPosition.longitude : 105.8521484
  };
  <GoogleMap defaultZoom={16} defaultCenter={position}>
    {props.isMarkerShown && (
      <Marker
        position={position}
        draggable
        onDragEnd={e => {
          fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${e.latLng.lat()},${e.latLng.lng()}&sensor=false&key=AIzaSyCYcnnPJ3J-v8nbiyGbp4APnQANcmQeIwc`
          )
            .then(response => {
              if (!response.ok) {
                console.log(response);
              }
              return response.json(); //we only get here if there is no error
            })
            .then(response => {
              console.log(response.results[0]);
              console.log(response.results[0].address_components[response.results[0].address_components.length - 1].long_name);
              console.log(response.results[0].address_components[response.results[0].address_components.length - 2].long_name);
              console.log(response.results[0].address_components[response.results[0].address_components.length - 3].long_name);
              console.log(response.results[0].address_components[response.results[0].address_components.length - 4].long_name);
              console.log(response.results[0].address_components[response.results[0].address_components.length - 5].long_name);
            })
            .catch(err => {
              console.log(err);
            });
        }}
      />
    )}
  </GoogleMap>;
});

export interface IGoogleMapsProps extends StateProps, DispatchProps {
  updateMarkerPosition: Function;
  currentPosition: any;
}

export interface IGoogleMapsState {}

export class GoogleMaps extends React.Component<IGoogleMapsProps, IGoogleMapsState> {
  timer: any;

  state = {
    isMarkerShown: false
  };

  componentDidMount() {
    this.timer = null;
    this.delayedShowMarker();
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  delayedShowMarker = () => {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.setState({ isMarkerShown: true });
    }, 3000);
  };

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false });
    this.delayedShowMarker();
  };

  render() {
    return (
      <MyMapComponent
        updateMarkerPosition={this.props.updateMarkerPosition}
        isMarkerShown={this.state.isMarkerShown}
        currentPosition={this.props.currentPosition}
        onMarkerClick={this.handleMarkerClick}
      />
    );
  }
}

const mapStateToProps = storeState => ({
  cities: storeState.city.entities
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleMaps);
