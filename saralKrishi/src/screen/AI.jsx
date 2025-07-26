import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Bubble,
  Composer,
  GiftedChat,
  InputToolbar,
  Send,
} from 'react-native-gifted-chat';
import uuid from 'react-native-uuid';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import GiftedChatWithRef from '../components/GiftedChatWithRef';
import { API_URL, userAuthStore } from '../store/authStore';

const SimpleChat = () => {
  const { user } = userAuthStore();
  console.log(user ? user.avatar : 'no user'); // Check what this logs

  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello! How can I assist you today?',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: 'Farmer AI',
        avatar: require('../assets/AI.png'), // Update with the correct path
      },
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const getAIResponse = async input => {
    try {
      const response = await axios.post(
        `${API_URL}/ai/text`,
        { input },
        { withCredentials: true },
      );
      return response.data.chatCompletion;
    } catch (error) {
      console.error('Error fetching AI response:', error);
      return "I'm not sure how to respond to that. Please try again.";
    }
  };

  const handleSendMessage = async (newMessages = []) => {
    if (newMessages.length > 0) {
      const newUserMessage = newMessages[0];
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, [newUserMessage]),
      );
      setIsLoading(true);
      Keyboard.dismiss();

      try {
        // Fetch AI response
        const aiResponse = await getAIResponse(newUserMessage.text);

        // Generate AI response message
        const newAIMessage = {
          _id: uuid.v4(),
          text: aiResponse,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Farmer AI',
            avatar: require('../assets/AI.png'), // Update with the correct path
          },
        };

        // Append AI response to the chat
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [newAIMessage]),
        );
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const renderBubble = props => (
    <Bubble
      {...props}
      wrapperStyle={{
        right: { backgroundColor: '#2e64e5' },
        left: { backgroundColor: '#f0f0f0' },
      }}
      textStyle={{
        right: { color: '#fff' },
        left: { color: '#333' },
      }}
    />
  );

  const renderSend = props => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Feather name="send" size={22} color="#2e64e5" />
      </View>
    </Send>
  );

  const scrollToBottomComponent = () => (
    <FontAwesome name="angle-double-down" size={22} color="#2e64e5" />
  );

  const renderInputToolbar = props => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  );

  const renderComposer = props => (
    <Composer {...props} textInputStyle={styles.composer} />
  );

  useEffect(() => {
    // Auto-scroll when new messages are added
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>saralKheti</Text>
      </View>
      <GiftedChatWithRef
        ref={chatBoxRef}
        messages={messages}
        onSend={messages => handleSendMessage(messages)}
        user={{
          _id: 1,
          name: user ? user.name : 'User',
          avatar: user ? user.avatar : require('../assets/person.png'), // Update with the correct path
        }}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
      />
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#964B00" />
          <Text style={styles.loadingText}>AI is typing...</Text>
        </View>
      )}
    </View>
  );
};

export default SimpleChat;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#e3e3e3',
  },
  header: {
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2e64e5',
  },
  sendButton: {
    alignSelf: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  inputToolbar: {
    marginBottom: 10,
    borderTopWidth: 1,
    borderTopColor: '#e3e3e3',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginHorizontal: 10,
  },
  composer: {
    height: 90,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#333',
    borderWidth: 1,
    marginHorizontal: 10,
    width: '90%',
  },
  loadingContainer: {
    position: 'absolute',
    bottom: 80,
    alignSelf: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 10,
  },
  loadingText: {
    color: 'white',
    marginTop: 5,
    textAlign: 'center',
  },
});

// import React, { useState, useEffect, useRef } from 'react';
// import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
// import { View, Text, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
// import uuid from 'react-native-uuid';
// import Feather from 'react-native-vector-icons/Feather';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { userAuthStore } from '../store/authStore';
// import { API_URL } from '../store/authStore';
// import GiftedChatWithRef from '../components/GiftedChatWithRef';

// const SimpleChat = () => {
//   const { user } = userAuthStore();
//   console.log(user ? user.avatar : "no user"); // Check what this logs

//   const [messages, setMessages] = useState([
//     {
//       _id: 1,
//       text: 'Hello! How can I assist you today?',
//       createdAt: new Date(),
//       user: {
//         _id: 2,
//         name: 'Farmer AI',
//         avatar: require('../assets/AI.png'), // Update with the correct path
//       },
//     },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);
//   const chatBoxRef = useRef(null);

//   const getAIResponse = async (input) => {
//     try {
//       const response = await axios.post(
//         `${API_URL}/ai/text`,
//         { input },
//         { withCredentials: true }
//       );
//       return response.data.chatCompletion;
//     } catch (error) {
//       console.error('Error fetching AI response:', error);
//       return "I'm not sure how to respond to that. Please try again.";
//     }
//   };

//   const handleSendMessage = async (newMessages = []) => {
//     if (newMessages.length > 0) {
//       const newUserMessage = newMessages[0];
//       setMessages((previousMessages) => GiftedChat.append(previousMessages, [newUserMessage]));
//       setIsLoading(true);
//       Keyboard.dismiss();

//       try {
//         // Fetch AI response
//         const aiResponse = await getAIResponse(newUserMessage.text);

//         // Generate AI response message
//         const newAIMessage = {
//           _id: uuid.v4(),
//           text: aiResponse,
//           createdAt: new Date(),
//           user: {
//             _id: 2,
//             name: 'Farmer AI',
//             avatar: require('../assets/AI.png'), // Update with the correct path
//           },
//         };

//         // Append AI response to the chat
//         setMessages((previousMessages) => GiftedChat.append(previousMessages, [newAIMessage]));
//       } catch (error) {
//         console.error('Error sending message:', error);
//       } finally {
//         setIsLoading(false);
//       }

//     }
//   };

//   const renderBubble = (props) => (
//     <Bubble
//       {...props}
//       wrapperStyle={{
//         right: { backgroundColor: '#2e64e5' },
//         left: { backgroundColor: '#f0f0f0' },
//       }}
//       textStyle={{
//         right: { color: '#fff' },
//         left: { color: '#333' },
//       }}
//     />
//   );

//   const renderSend = (props) => (
//     <Send {...props}>
//       <View style={styles.sendButton}>
//         <Feather name='send' size={22} color='#2e64e5' />
//       </View>
//     </Send>
//   );

//   const scrollToBottomComponent = () => <FontAwesome name="angle-double-down" size={22} color="#2e64e5" />;

//   const renderInputToolbar = (props) => (
//     <InputToolbar {...props} containerStyle={styles.inputToolbar} />
//   );

//   const renderComposer = (props) => (
//     <Composer {...props} textInputStyle={styles.composer} />
//   );

//   useEffect(() => {
//     // Auto-scroll when new messages are added
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerText}>saralKheti</Text>
//       </View>
//       <GiftedChat
//         ref={chatBoxRef}
//         messages={messages}
//         onSend={(messages) => handleSendMessage(messages)}
//         user={{
//           _id: 1,
//           name: user ? user.name : 'User',
//           avatar: user ? user.avatar : require('../assets/person.png'), // Update with the correct path
//         }}
//         alwaysShowSend
//         renderSend={renderSend}
//         scrollToBottom
//         scrollToBottomComponent={scrollToBottomComponent}
//         renderBubble={renderBubble}
//         renderInputToolbar={renderInputToolbar}
//         renderComposer={renderComposer}
//       />
//       {isLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size='large' color='#964B00' />
//           <Text style={styles.loadingText}>AI is typing...</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// export default SimpleChat;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     width: '100%',
//     backgroundColor: '#e3e3e3',
//   },
//   header: {
//     alignSelf: 'center',
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   headerText: {
//     fontSize: 22,
//     fontWeight: '600',
//     color: '#2e64e5',
//   },
//   sendButton: {
//     alignSelf: 'center',
//     marginVertical: 10,
//     marginHorizontal: 15,
//   },
//   inputToolbar: {
//     marginBottom: 10,
//     borderTopWidth: 1,
//     borderTopColor: '#e3e3e3',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     marginHorizontal: 10,
//   },
//   composer: {
//     height: 90,
//     paddingTop: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     borderColor: '#333',
//     borderWidth: 1,
//     marginHorizontal: 10,
//     width: '90%',
//   },
//   loadingContainer: {
//     position: 'absolute',
//     bottom: 80,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.7)',
//     padding: 10,
//     borderRadius: 10,
//   },
//   loadingText: {
//     color: 'white',
//     marginTop: 5,
//     textAlign: 'center',
//   },
// });
