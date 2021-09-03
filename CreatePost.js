import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import DropDownPicker from 'react-native-dropdown-picker';
let customFonts = {
  BubblegumSans: require('../assets/BubblegumSans-Regular.ttf'),
};

export default class CreateStory extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
      previewImage: 'image_1',
      dropDownHeight: 40,
    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontLoaded: true,
    });
  }
  componentDidMount() {
    this.loadFontAsync();
  }
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      let preview_image = {
        image_1: require('../assets/image_1.jpg'),
        image_2: require('../assets/image_2.jpg'),
        image_3: require('../assets/image_3.jpg'),
        image_4: require('../assets/image_4.jpg'),
        image_5: require('../assets/image_5.jpg'),
      };
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                source={require('../assets/logo.png')}
                style={styles.iconImage}
              />
            </View>

            <View style={styles.appTitleTextContainer}>
            <Text style={styles.appTitleText}>New Post</Text>
            </View>
          </View>
          <View style={styles.fieldsContainer}>
            <ScrollView>
              <Image
                style={styles.previewImage}
                source={preview_image[this.state.previewImage]}
              />
              <View style={{ height: RFValue(this.state.dropDownHeight) }}>
                <DropDownPicker
                  items={[
                    { label: 'image_1', value: 'image_1' },
                    { label: 'image_2', value: 'image_2' },
                    { label: 'image_3', value: 'image_3' },
                    { label: 'image_4', value: 'image_4' },
                    { label: 'image_5', value: 'image_5' },
                  ]}
                  defaultValue={this.state.previewImage}
                  containerStyle={{
                    height: 40,
                    borderRadius: 20,
                    marginBottom: 10,
                  }}
                  onOpen={() => {
                    this.setState({
                      dropDownHeight: 170,
                    });
                  }}
                  onClose={() => {
                    this.setState({
                      dropDownHeight: 40,
                    });
                  }}
                  style={{ backgroundColor: 'transparent' }}
                  itemStyle={{ justifyContent: 'flex-start' }}
                  dropDownStyle={{ backgroundColor: '#2f345d' }}
                  labelStyle={{ color: 'white', fontFamily: 'Bubblegum-Sans' }}
                  arrowStyle={{ color: 'white', fontFamily: 'Bubblegum-Sans' }}
                  onChangeItem={(a) => {
                    this.setState({
                      previewImage: a.value,
                    });
                  }}
                />
                 </View>
               
                <TextInput
                  placeholder="Caption"
                  style={[
                    styles.inputFont,
                    styles.inputFontExtra,
                    styles.inputTextBig,
                  ]}
                  onChangeText={(caption) => {
                    this.setState({
                      caption
                    });
                  }}
                  multiline={true}
                  numberOfLines={20}
                  placeholderTextColor="white"
                />
              
             
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: { flex: 0.07, flexDirection: 'row' },
  appIcon: { flex: 0.3, justifyContent: 'center', alignItems: 'center' },
  iconImage: { width: '100%', height: '100%', resizeMode: 'contain' },
  appTitleTextContainer: { flex: 0.7, justifyContent: 'center' },
  appTitleText: {
    color: 'white',
    fontSize: RFValue(28),
    fontFamily: 'Bubblegum-Sans',
  },
  fieldsContainer: { flex: 0.85 },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  inputFont: {
    height: RFValue(40),
    borderColor: 'white',
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: 'white',
    fontFamily: 'Bubblegum-Sans',
  },
  inputFontExtra: { marginTop: RFValue(15) },
  inputTextBig: { textAlignVertical: 'top', padding: RFValue(5) },
});
