/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';


const styles = StyleSheet.create({
  fixToText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: '10%',
    fontSize: 50,
  },
  buttonSelected: {
    backgroundColor: 'lightgrey',
    width: '50%',
    height: '100%',
  },
  button: {
    backgroundColor: 'beige',
    width: '50%',
    height: '100%',
  },
  script: {
    fontSize: 15,
    alignSelf: 'center',
    marginTop: '15%',
  }
});

export default class Tabs extends Component {
  render() {
    return (
      <View style={styles.fixToText}>
        <TouchableHighlight underlayColor="lightgrey" onPress={() => this.props.updateHome(true)} style={this.props.home ? styles.buttonSelected : styles.button}>
          <Text style={styles.script}>Find</Text>
        </TouchableHighlight>

        <TouchableHighlight underlayColor="lightgrey" onPress={() => this.props.updateHome(false)} style={this.props.home ? styles.button : styles.buttonSelected}>
          <Text style={styles.script}>GOAT</Text>
        </TouchableHighlight>

      </View>
    );
  }
}
