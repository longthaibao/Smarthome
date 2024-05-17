import React, { Component } from 'react';
import axios from 'axios';
import { Text, View, ScrollView, StyleSheet, Image, TouchableOpacity } from 'react-native';
import icon from '../../assets/favicon.png';
import Header from "../../components/Header/Header.js";

class StatsList extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={styles.listContainer}>
        {
          this.props.stats.map((item) => (
            <View key={item._id} style={styles.item}>
              <Image source={item.image} style={styles.icon} />
              <View style={styles.infoWrap}>
                <Text style={styles.person}>
                  {item.name}
                </Text>
                <Text style={styles.count}>
                  {item.count}
                </Text>
              </View>
            </View>
          ))
        }
      </ScrollView>
    )
  }
}

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      sortBy: 'lowest',
    };
    this.fetchStatsData();
  }

  async fetchStatsData() {
    try {
      const response = await axios.get('http://localhost:8080/member/static');
      const statsData = response.data;
      const sortedStatsData = [...statsData].sort((a, b) => new Date(b.count) - new Date(a.count));
      await this.setState({ stats: sortedStatsData });
    } catch (error) {
      console.error('Error fetching stats data:', error);
    }
  }

  sortByLowest = () => {
    const sortedStats = [...this.state.stats].sort((a, b) => new Date(b.count) - new Date(a.count));
    this.setState({ stats: sortedStats, sortBy: 'lowest' });
  }

  sortByHighest = () => {
    const sortedStats = [...this.state.stats].sort((a, b) => new Date(a.count) - new Date(b.count));
    this.setState({ stats: sortedStats, sortBy: 'highest' });
  }

  toggleSort = () => {
    const { sortBy } = this.state;
    if (sortBy === 'lowest') {
      this.sortByHighest();
    } else {
      this.sortByLowest();
    }
  }

  render() {
    const { stats, sortBy } = this.state;
    return (
      <View style={styles.container}>
        <Header title={"Statistics"} />
        <TouchableOpacity onPress={this.toggleSort} style={styles.sortContainer}>
          <Text style={styles.sortText}>
            sort by: {sortBy === 'lowest' ? 'Lowest' : 'Highest'}
          </Text>
        </TouchableOpacity>
        <StatsList stats={stats} />
      </View>
    );
  }
}

export default Stats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // borderWidth: 2,
    padding: 5,
    backgroundColor: '#eff1f5'
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },

  person: {
    fontSize: 20,
    fontWeight: 'medium',
    flex: 1,
  },

  count: {
    fontSize: 20,
    fontWeight: 'thin',
    margin: 5,
  }
});
