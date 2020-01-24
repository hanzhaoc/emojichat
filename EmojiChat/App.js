import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import io from 'socket.io-client';

export default function App() {
  useEffect(() => {
    io("http://172.16.77.11:3001")
  },[])

  console.disableYellowBox = true;

  return (<HomeScreen />);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
