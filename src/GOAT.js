/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';


const styles = StyleSheet.create({
  listStyle: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%',
    height: '100%',
    paddingTop: '15%'
  },
  listItem: {
    fontSize: 25,
    padding: '5%',
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  }
});

export default class GOAT extends Component {
  render() {

    const likedRestaurants = this.props.restaurant === '' ? 'empty' : (this.props.restaurants).map((restaurant, id) => {
      return <Text key={id} style={styles.listItem}>
        <Text> ❥ </Text>
        <Text> {restaurant} </Text>
      </Text>
    })

    return (
      <ScrollView>
        <View style={styles.listStyle}>
          {likedRestaurants}
        </View>
      </ScrollView>
    );
  }
}
