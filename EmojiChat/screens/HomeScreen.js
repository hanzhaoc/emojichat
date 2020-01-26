import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

export default function HomeScreen() {
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("http://192.168.5.74:3001");
    socket.current.on('message', message => {
      setRecvMessages(prevState => GiftedChat.append(prevState, message));
    })
  },[])

  const onSend = (messages) => {
    socket.current.emit('message', messages[0].text);
    setRecvMessages(prevState => GiftedChat.append(prevState, messages[0]));
  }

  return (
      <GiftedChat
        messages={recvMessages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }}
      />
  );
}