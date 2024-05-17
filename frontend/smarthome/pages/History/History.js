import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity  } from 'react-native';
import Header from "../../components/Header/Header.js";
import icon from '../../assets/favicon.png';

class HistoryList extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        {
          this.props.names.map((item) => (
            <View key={item._id} style={styles.item} onPress={0}>
              <Image source={item.image} style={styles.icon} />
              <View style={styles.infoWrap}>
                <Text style={styles.person}>
                  {item.name}
                </Text>
                <Text style={styles.time}>
                  {item.time}
                </Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: [],
      sortBy: 'timeLatest',
    };
    this.fetchMemberHistory();
  }

  async fetchMemberHistory() {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_BACKEND_URL + '/member/history');
      const memberHistory = response.data;
      const sortedMemberHistory = [...memberHistory].sort((a, b) => new Date(b.time) - new Date(a.time));
      await this.setState({ names: sortedMemberHistory });
    } catch (error) {
      console.error('Error fetching member history:', error);
    }
  }

  sortByTimeLatest = () => {
    const sortedNames = [...this.state.names].sort((a, b) => new Date(b.time) - new Date(a.time));
    this.setState({ names: sortedNames, sortBy: 'timeLatest' });
  }

  sortByTimeOldest = () => {
    const sortedNames = [...this.state.names].sort((a, b) => new Date(a.time) - new Date(b.time));
    this.setState({ names: sortedNames, sortBy: 'timeOldest' });
  }

  toggleSort = () => {
    const { sortBy } = this.state;
    if (sortBy === 'timeLatest') {
      this.sortByTimeOldest();
    } else {
      this.sortByTimeLatest();
    }
  }

  render() {
    const { names, sortBy } = this.state;
    return (
      <View style={styles.container}>
        <Header title={"History"} />
        <TouchableOpacity onPress={this.toggleSort} style={styles.sortContainer}>
          <Text style={styles.sortText}>
            sort by: {sortBy === 'timeLatest' ? 'Oldest' : 'Latest'}
          </Text>
        </TouchableOpacity>
        <HistoryList names={names} />
      </View>
    );
  }
}

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 2,
    padding: 5,
    backgroundColor: '#eff1f5',
  },

  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },

  sortContainer: {
    marginTop: 40,
    // borderWidth: 2,
    alignSelf: 'flex-end',
    marginRight: 20,
  },

  sortText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  listContainer: {
    marginTop: 10,
    width: 336,
    flex: 1,
    alignSelf: 'center',
  },

  item: {
    flexDirection: 'row',
    width: 330,
    height: 60,
    borderColor: 'black',
    marginVertical: 5,
    backgroundColor: '#ffffff'
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    borderRadius: 50,
    marginVertical: 5,
    marginHorizontal: 10,
  },

  infoWrap: {
    justifyContent: 'center',
  },

  person: {
    fontSize: 20,
    margin: 3,
    fontWeight: 'medium',
  },

  time: {
    fontSize: 12,
    marginLeft: 2,
    fontWeight: 'thin',
  }
});
