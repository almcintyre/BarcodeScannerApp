import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  AlertIOS
} from 'react-native';
import RNCamera from 'react-native-camera';


type Props = {};
export default class Camera extends Component<Props> {

  constructor(props) {
        super(props);
        this.state = {
            upcs: ''
        }
    }

  componentDidMount() {
    fetch('https://barcode-scanner-api-green.herokuapp.com/upcs')
    .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({upcs: responseJson});
      }).catch((error) => {
        console.error(error);
      });
  }

  onBarCodeRead = (e) => {
    var upcPresent = false;
    this.state.upcs.map(function(upc) {
      if (upc.upc == e.data) {
        upcPresent = true;
      } 
    }.bind(this));
    if(upcPresent == false) {
      AlertIOS.alert(
        'Error!',
        'Your UPC is not in the system.'
      );
    } else {
      AlertIOS.alert(
        'UPC match!',
        'Your UPC is in the system.'
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
              this.camera = ref;
            }}
          style = {styles.preview}
          onBarCodeRead={this.onBarCodeRead}
          >
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
});
