import React from 'react'
import MessageItem from './MessageItem'
import { FlashList } from '@shopify/flash-list'

const MessageList = ({ messages, currentUser, scrollRef }) => {
  // console.log('message: ', messages);
  return (
    <FlashList
      ref={scrollRef}
      data={messages}
      contentContainerStyle={{ paddingTop: 10 }}
      renderItem={(message, index) => {
        
        return (
          <MessageItem message={message} key={index} currentUser={currentUser} />
        )
      }}
    />
  )
}

export default MessageList