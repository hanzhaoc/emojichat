import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client'
import { GiftedChat } from 'react-native-gifted-chat'

export default function HomeScreen() {
  const [recvMessages, setRecvMessages] = useState([]);
  const socket = useRef(null)

  useEffect(() => {
    socket.current = io("http://192.168.5.74:3001");
    socket.current.on('message', message => {
      const testMessage = {  
        _id: 3,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        }
      };
      testMessage.text = message;
      setRecvMessages(prevState => GiftedChat.append(prevState, testMessage))
    })
  },[])

  const onSend = (messages) => {
    // console.log(messages);
    // console.log(messages[0]);
    socket.current.emit('message', messages[0].text)
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