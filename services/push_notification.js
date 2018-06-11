import { Permissions, Notifications } from 'expo';
import axios from 'axios';
import { AsyncStorage } from 'react-native';

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens';
export default async () => {
  let previousToken = await AsyncStorage.getItem('pushtoken');
  console.log(previousToken);
  if (previousToken) {
    return;
  } else {
    let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      if (status !== 'granted') {
        alert('Hey! You might want to enable notifications for my app, they are good.');
      }
      let token = await Notifications.getExpoPushTokenAsync();
      await axios.post(PUSH_ENDPOINT, { token: { token } });
      AsyncStorage.setItem('pushtoken', token);

  }
};
