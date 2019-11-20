/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';


const styles = StyleSheet.create({
  listStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    paddingTop: '10%',
    paddingLeft: '5%',
  },
  listItem: {
    fontSize: 15,
    paddingBottom: '10%',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },
  titles: {
    color: 'grey',
  }
});

export default class Restaurants extends Component {
  render() {
    // categories (titles), name, id, photos, price, rating, review_count
    var list = this.props.foods.length === 0 ? 'empty' :
      (this.props.foods).map((restaurant, id) => {
        return <View key={id} style={styles.listItem}><Text>
          {restaurant[4]} {restaurant[1]}, rated {restaurant[5]} by {restaurant[6]}
        </Text>
          <Text style={styles.titles}>{restaurant[0].join(' | ')}</Text>
          <Image
            style={{ width: '90%', height: '90%' }}
            source={{ uri: restaurant[3][0] }}
          />
        </View>
      });

    return (
      <View style={styles.listStyle}>
        {list}
      </View>
    );
  }
}
