import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import _ from 'lodash';
import { AppLoading } from 'expo';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  { text: 'Welcome to Job App', color: '#03A9F4' },
  { text: 'Use this to get a job', color: '#009688' },
  { text: 'Set your location, then swipe away', color: '#03A9F4' }
];

class WelcomeScreen extends Component {
  state = { token: null }

  async componentDidMount() {
    let token = AsyncStorage.getItem('fb_token');
    if (token) {
      this.props.navigation.navigate('map');
      this.setState({ token });
    } else {
      this.setState({ token: false });
    }
  }
  onSlidesComplete() {
    this.props.navigation.navigate('auth');
  }
  render() {
    if (_.isNull(this.state.token)) {
      return <AppLoading />;
    }
    return (
      <View style={{ flex: 1 }}>
        <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete.bind(this)} />
      </View>
    );
  }
}

export default WelcomeScreen;
