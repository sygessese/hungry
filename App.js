import React, { Component } from 'react';
import samplequery from './samplequery';
import Tabs from './src/Tabs';
import GOAT from './src/GOAT';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import {
  StyleSheet,
  View,
  Text,
} from 'react-native';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      locationSet: false,
      lat: '',
      long: '',
      locError: '',
      foods: '',
      foodsError: '',
      liked: '',
      likedError: '',
    };
    this.updateHome = this.updateHome.bind(this);
    this.getLoc = this.getLoc.bind(this);
  }

  getFoods(lat, long) {
    axios.get('http://localhost:3000/', { params: { lat, long } })
      .then(foods => this.setState({ foods: foods.data }))
      .catch(foodsError => this.setState({ foodsError }))
  }

  getLoc() {
    Geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        this.setState({ lat, long, locationSet: true }, () => this.getFoods(this.state.lat, this.state.long))
      },
      (locError) => this.setState({ locError: locError.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  updateHome(bool) {
    if (bool !== this.state.home) {
      this.setState({ home: bool })
    }
  }

  getLikes() {
    axios.get('http://localhost:3000/api/restaurants')
      .then(liked => this.setState({ liked: liked.data }))
      .catch(err => this.setState({ likesError: err }))
  }

  componentDidMount() {
    this.getLikes();
  }

  render() {
    const search = <View style={styles.searchContainer}>
      <Text style={styles.searchTitle} onPress={this.getLoc}>Hungry</Text></View>;

    const found = <View style={styles.foundContainer}>
      <Text style={styles.foundTitle}>Hungry</Text>
      <Text style={styles.foundDescription}>
        lat: {this.state.lat} long: {this.state.long}
        foods: {this.state.foods}
      </Text></View>;

    const homeView = this.state.locationSet ? found : search;

    const likedView = <View style={styles.foundContainer}><GOAT restaurants={this.state.liked} /></View>

    return (
      <View style={styles.body}>
        {this.state.home ? homeView : likedView}
        <Tabs style={styles.tabs} updateHome={this.updateHome} home={this.state.home} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  foundContainer: {
    paddingTop: 52,
    paddingHorizontal: 24,
  },
  foundTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  foundDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  searchTitle: {
    fontSize: 50,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  searchContainer: {
    paddingTop: 300,
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
  },
  tabs: {
    marginBottom: 0,
    backgroundColor: 'yellow',
    height: '200'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: 'white'
  }
});

export default App;
