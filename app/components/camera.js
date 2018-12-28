import React, { Component } from 'react'
import {
    ScrollView,
    Image,
    View,
    Button,
    CameraRoll,
    PermissionsAndroid 

} from 'react-native'

async function requestCameraPermission() {
    console.log('hello')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          'title': 'Cool Photo App Camera Permission',
          'message': 'Cool Photo App needs access to your camera ' +
                     'so you can take awesome pictures.'
        }
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera")
      } else {
        console.log("Camera permission denied")
      }
    } catch (err) {
      console.warn(err)
    }
  }

export default class Camera extends Component {
    state = {
        photos: []
    }
    componentWillMount() {
        requestCameraPermission()
        
    }
    
    _handleButtonPress = () => {
        //requestCameraPermission()
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
          })
          .then(r => {
            this.setState({ photos: r.edges });
          })
          .catch((err) => {
             //Error Loading Images
             console.log(err)
          });
        };
   

     render() {
      return (
        <View>
          <Button title="Load Images" onPress={this._handleButtonPress} />
          <ScrollView>
            {this.state.photos.map((p, i) => {
            return (
              <Image
                key={i}
                style={{
                  width: 300,
                  height: 100,
                }}
                source={{ uri: p.node.image.uri }}
              />
            );
          })}
          </ScrollView>
        </View>
      );
     }
}