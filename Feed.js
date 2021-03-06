import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  FlatList,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import PostCard from './postCard';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
let customFonts = {
  BubblegumSans: require('../assets/BubblegumSans-Regular.ttf'),
};
let photos = require('./temp_photos.json');
export default class Feed extends Component {
  constructor() {
    super();
    this.state = {
      fontLoaded: false,
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
  keyExtracter = (item, index) => index.toString();
  renderItem = ({ item: pic }) => {
    return <PostCard photo={pic} navigation={this.props.navigation} />;
  };
  render() {
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    } else {
      return (
        <View style={styles.container}>
          <SafeAreaView style={styles.droidSafeArea} />
          <View style={styles.appTitle}>
            <View style={styles.appIcon}>
              <Image
                style={styles.iconImage}
                source={require('../assets/logo.png')}
              />
            </View>
            <View style={styles.appTitleTextContainer}>
              <Text style={styles.appTitleText}>Spectagram</Text>
            </View>

           
          </View>
           <View style={styles.cardContainer}>
         
            <FlatList
              renderItem={this.renderItem}
              keyExtracter={this.keyExtracter}
              data={photos}
            />
           
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
  cardContainer: { flex: 0.93 },
});
