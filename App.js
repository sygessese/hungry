import React, { Component } from 'react';
import samplequery from './samplequery';
import Tabs from './src/Tabs';
import GOAT from './src/GOAT';
import Restaurants from './src/Restaurants';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import yelpAPI from './yelpAPI';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
} from 'react-native';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      home: true,
      locationSet: false,
      foodFetched: false,
      lat: '',
      long: '',
      locError: '',
      foods: [],
      foodsError: '',
      liked: '',
      likedError: '',
    };
    this.updateHome = this.updateHome.bind(this);
    this.getLoc = this.getLoc.bind(this);
  }

  // latitude: ${this.state.lat},
  // longitude: ${this.state.long},

  getFoods() {
    axios.get('http://localhost:3000/test')
      .then(foods => {
        var results = [];
        foods.data.data.search.business.map(({ categories, name, id, photos, price, rating, review_count }) => {
          categories = categories.map(({ title }) => title)
          results.push([categories, name, id, photos, price, rating, review_count]);
        })
        this.setState({
          foods: results,
          foodFetched: true
        })
      })
      .catch(foodsError => this.setState({ foodsError }))
  }

  getLoc() {
    Geolocation.getCurrentPosition(
      (position) => {
        var lat = parseFloat(position.coords.latitude);
        var long = parseFloat(position.coords.longitude);
        this.setState({ lat, long, locationSet: true }, this.getFoods)
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

    const found =
      <View style={styles.foundContainer}>
        <Text style={styles.foundTitle}>Hungry</Text>
        {this.state.foodFetched ?
          <ScrollView style={{ flexGrow: 1 }}><Restaurants foods={this.state.foods} /></ScrollView> :
          <Text>{this.state.foodsError}</Text>}
      </View>
      ;

    const homeView = this.state.locationSet ? found : search;

    const likedView = <View style={styles.GOATContainer}><GOAT restaurants={this.state.liked} /></View>

    return (
      <View style={styles.body}>
        {this.state.home ? homeView : likedView}
        <Tabs style={styles.tabs} updateHome={this.updateHome} home={this.state.home} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  GOATContainer: {
    paddingTop: '10%',
    backgroundColor: '#9eafc1',
    height: '100%',
  },
  foundContainer: {
    backgroundColor: '#9eafc1',
    height: '100%',
    paddingTop: '10%',
    display: 'flex',
    flexDirection: 'column',
  },
  foundTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    height: 40,
    marginBottom: 0,
    textAlign: 'center',
    backgroundColor: '#9eafc1',
  },
  searchTitle: {
    fontSize: 50,
    fontWeight: '600',
    paddingTop: 300,
    color: Colors.black,
    textAlign: 'center',
  },
  searchContainer: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark,
    height: '100%',
  },
  tabs: {
    backgroundColor: 'black',
    zIndex: 99,
    height: '30%',
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    height: '92%',
    backgroundColor: 'slategray'
  }
});

export default App;
