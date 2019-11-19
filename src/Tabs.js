/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Button,
} from 'react-native';


const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
});

export default class Tabs extends Component {
  render() {
    return (
      <View style={styles.fixToText}>
        <Button title="Find" onPress={() => this.props.updateHome(true)} />
        <Button title="Faves" onPress={() => this.props.updateHome(false)} />
      </View>
    );
  }
}
