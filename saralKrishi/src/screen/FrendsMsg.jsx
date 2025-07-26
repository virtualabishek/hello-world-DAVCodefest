import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble, Send, InputToolbar, Composer } from 'react-native-gifted-chat';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const FrendsMsg = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! How are you?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Friend',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
  }, []);

  const renderBubble = (props) => (
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

  const renderSend = (props) => (
    <Send {...props}>
      <View style={styles.sendButton}>
        <Feather name="send" size={22} color="#2e64e5" />
      </View>
    </Send>
  );

  const scrollToBottomComponent = () => <FontAwesome name="angle-double-down" size={22} color="#2e64e5" />;

  const renderInputToolbar = (props) => (
    <InputToolbar {...props} containerStyle={styles.inputToolbar} />
  );

  const renderComposer = (props) => (
    <Composer {...props} textInputStyle={styles.composer} />
  );

  return (
    <SafeAreaProvider>
      <LinearGradient colors={['#0B7645', '#B5C1AE']} style={styles.linearGradient}>
        <View style={styles.container}>
          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{ _id: 1 }}
            alwaysShowSend
            renderSend={renderSend}
            scrollToBottom
            scrollToBottomComponent={scrollToBottomComponent}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            renderComposer={renderComposer}
          />
        </View>
      </LinearGradient>
    </SafeAreaProvider>
  );
};

export default FrendsMsg;

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
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
    height: 60,
    paddingTop: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#333',
    borderWidth: 1,
    marginHorizontal: 10,
    width: '90%',
  },
});