import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import io from 'socket.io-client'
export default function HomeScreen() {

  const [messageToSend, setMessageToSend] = useState("");
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("http://172.16.77.11:3001");
    socket.current.on('message', message => {
      setRecvMessages(prevState => [...prevState, message])
    })
  },[])

  const sendMessage = () => {
    socket.current.emit('message', messageToSend)
    setMessageToSend('');
  }

  const receivedMessages = recvMessages.map( message => {
    return <Text key={message}>{message}</Text>
  })

  return (
    <View style={styles.container}>
      {receivedMessages}
      <TextInput 
      value={messageToSend} 
      onChangeText={text => setMessageToSend(text)}
      placeholder="Enter chat message..."
      onSubmitEditing={sendMessage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
