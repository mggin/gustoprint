import React, { Component } from 'react'
import {
    ScrollView,
    Image,
    View,
    Button,
    CameraRoll,
    PermissionsAndroid 

} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import HoneyWell from '../../NativeModules'
import RNFS from 'react-native-fs';

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
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  
  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  
export default class Camera extends Component {
    state = {
        photos: [],
        avatarSource: null
    }
    componentWillMount() {
        requestCameraPermission()
        // console.log(RNFS.read)
        console.log(RNFS.DocumentDirectoryPath)
        // let path = "/data/user/0/com.gustoprint/lib-main"
        // RNFS.readDir(path)
        //   .then((infos) => {
        //     console.log(infos)
        //   })
        const dest = RNFS.DocumentDirectoryPath+ "/roll.png"
        RNFS.copyFileAssets('images/california_roll.png', dest )
          .then((msg) => {
            //console.log(msg)
          })

        RNFS.readDir(RNFS.DocumentDirectoryPath) 
          .then((info) => {
            //console.log({info})
          })
        
    }
    _handleButtonPress = () => {
        //requestCameraPermission()
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
        
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          } else {
            const source = { uri: response.uri };
        
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        
            this.setState({
              avatarSource: source,
            });
          }
        });
        };
   

     render() {
      return (
        <View>
          <Button title="Load Images" onPress={this._handleButtonPress} />
          <ScrollView>
          <Image source={this.state.avatarSource}  />
          </ScrollView>
        </View>
      );
     }
}