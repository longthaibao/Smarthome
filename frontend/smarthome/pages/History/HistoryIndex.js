import React, { Component } from 'react';
import { Text, View, Button, StyleSheet,  TouchableOpacity } from 'react-native';
import Stats from './Stats.js';
import History from './History.js';
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet.js";

class HistoryIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showStats: false,
    };
  }

  togglePage = () => {
    this.setState((prevState) => ({
      showStats: !prevState.showStats,
    }));
  }

  render() {
    const { showStats } = this.state;
    return (
      <>
        <View style={[{alignContent:'center', flex:1}]}>
          <TouchableOpacity style={styles.button} onPress={this.togglePage}>
              <Text style={styles.buttonText}>
                  {showStats ? "Stats" : "History"} 
              </Text>
          </TouchableOpacity>
          {showStats ? <Stats /> : <History />} 
        </View>
        <BottomSheetComponent active={5}/>
      </>
    );
  }
}

export default HistoryIndex;

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        zIndex: 3,
        top: 50,
        right: 30,
        borderRadius: 10,
        width: 60,
        height: 30,
        backgroundColor: '#3498db',
    },

    buttonText: {
        color: '#ffffff',
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center',
      },
})
