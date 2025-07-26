import React, { forwardRef } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

// Forward the ref to GiftedChat
const GiftedChatWithRef = forwardRef((props, ref) => {
    return <GiftedChat {...props} ref={ref} />;
});

export default GiftedChatWithRef;
